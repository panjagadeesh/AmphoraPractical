const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Get all JSON files from mochawesome output
const jsonFiles = glob.sync('cypress/reports/html/.jsons/*.json');
const reportPath = path.join(__dirname, 'reports', 'html');

// Create reports directory if it doesn't exist
if (!fs.existsSync(reportPath)) {
    fs.mkdirSync(reportPath, { recursive: true });
}

// Combine all results
const combinedResults = {
    totalTests: 0,
    totalPassed: 0,
    totalFailed: 0,
    totalSkipped: 0,
    specs: []
};

jsonFiles.forEach(file => {
    const results = JSON.parse(fs.readFileSync(file, 'utf8'));
    const stats = results.stats;
    const tests = results.results[0].suites[0].tests;

    combinedResults.totalTests += stats.tests;
    combinedResults.totalPassed += stats.passes;
    combinedResults.totalFailed += stats.failures;
    combinedResults.totalSkipped += stats.skipped;

    combinedResults.specs.push({
        name: results.results[0].suites[0].title,
        tests: tests.map(test => ({
            title: test.title,
            state: test.pass ? 'passed' : test.fail ? 'failed' : 'skipped',
            duration: test.duration,
            error: test.err ? test.err.message : null
        }))
    });
});

// Generate HTML report
const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Cypress Test Report</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 20px;
            background-color: #f8f9fa;
        }
        .header { 
            background: #ffffff; 
            padding: 20px; 
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        .summary { 
            margin: 20px 0;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .test { 
            margin: 15px 0; 
            padding: 15px; 
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .passed { 
            background-color: #d4edda; 
            border: 1px solid #c3e6cb;
        }
        .failed { 
            background-color: #f8d7da; 
            border: 1px solid #f5c6cb;
        }
        .skipped {
            background-color: #fff3cd;
            border: 1px solid #ffeeba;
        }
        .stats { 
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .stat-item { 
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            font-weight: bold;
        }
        .total { background-color: #e9ecef; }
        .passed-stat { background-color: #d4edda; }
        .failed-stat { background-color: #f8d7da; }
        .skipped-stat { background-color: #fff3cd; }
        .spec-title {
            background-color: #e9ecef;
            padding: 10px;
            border-radius: 5px;
            margin: 20px 0 10px;
        }
        .error-message {
            color: #721c24;
            background-color: #f8d7da;
            padding: 10px;
            border-radius: 4px;
            margin-top: 10px;
        }
        .timestamp {
            color: #6c757d;
            font-size: 0.9em;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Cypress Test Report</h1>
        <div class="timestamp">Generated on: ${new Date().toLocaleString()}</div>
        <div class="stats">
            <div class="stat-item total">Total Tests: ${combinedResults.totalTests}</div>
            <div class="stat-item passed-stat">Passed: ${combinedResults.totalPassed}</div>
            <div class="stat-item failed-stat">Failed: ${combinedResults.totalFailed}</div>
            <div class="stat-item skipped-stat">Skipped: ${combinedResults.totalSkipped}</div>
        </div>
    </div>
    
    <div class="summary">
        <h2>Test Results</h2>
        ${combinedResults.specs.map(spec => `
            <div class="spec-title">
                <h3>${spec.name}</h3>
            </div>
            ${spec.tests.map(test => `
                <div class="test ${test.state}">
                    <h4>${test.title}</h4>
                    <p>Status: ${test.state.toUpperCase()}</p>
                    <p>Duration: ${test.duration}ms</p>
                    ${test.error ? `<div class="error-message">Error: ${test.error}</div>` : ''}
                </div>
            `).join('')}
        `).join('')}
    </div>
</body>
</html>
`;

// Write the HTML report
fs.writeFileSync(path.join(reportPath, 'index.html'), html);

console.log(`Report generated at: ${path.join(reportPath, 'index.html')}`); 