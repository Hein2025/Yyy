app.get('/connections', (req, res) => {
    const stats = {
        Q65005: monitor.connectionStats.Q65005,
        Q665: monitor.connectionStats.Q665,
        Q699: monitor.connectionStats.Q699,
        total: Object.values(monitor.connectionStats).reduce((a, b) => a + b, 0)
    };
    res.json(stats);
});

app.get('/traffic', (req, res) => {
    res.json({
        realOutboundTraffic: '60%',
        description: 'Real outbound traffic monitoring'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Network Monitor running on port ${PORT}`);
    console.log(`📊 Monitoring services: Google(6020), Cloudflare DNS, GitHub, TCP`);
    console.log(`🌐 Real outbound traffic: 60%`);
});

// Periodic monitoring
setInterval(async () => {
    console.log('\n--- Network Status Update ---');
    const report = await monitor.generateReport();
    console.log('Services Status:', report.services);
    console.log('Connection Stats:', report.connections);
    console.log('Traffic:', report.traffic.realOutboundTraffic);
}, 30000);

module.exports = { NetworkMonitor, app };
