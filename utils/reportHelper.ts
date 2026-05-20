import * as fs from 'fs';
import * as path from 'path';

/**
 * Report Helper
 * Utilities for generating and managing test reports
 * Configured reports: HTML
 */
class ReportHelper {
  private reportsDir: string;

  constructor(reportsDir = './reports') {
    this.reportsDir = reportsDir;
    this.ensureDir();
  }

  private ensureDir() {
    if (!fs.existsSync(this.reportsDir)) {
      fs.mkdirSync(this.reportsDir, { recursive: true });
    }
  }

  /**
   * Capture screenshot and save to reports
   */
  async captureScreenshot(page: any, name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = timestamp + '_' + name + '.png';
    const filepath = path.join(this.reportsDir, 'screenshots', filename);
    
    const screenshotDir = path.join(this.reportsDir, 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    await page.screenshot({ path: filepath, fullPage: true });
    return filepath;
  }

  /**
   * Add custom data to report
   */
  addReportData(testName: string, data: Record<string, any>) {
    const reportFile = path.join(this.reportsDir, 'custom-data.json');
    let existingData = [];
    
    if (fs.existsSync(reportFile)) {
      existingData = JSON.parse(fs.readFileSync(reportFile, 'utf8'));
    }
    
    existingData.push({
      testName,
      timestamp: new Date().toISOString(),
      ...data,
    });
    
    fs.writeFileSync(reportFile, JSON.stringify(existingData, null, 2));
  }

  /**
   * Generate HTML summary report
   */
  generateHtmlSummary(results: Array<{name: string; status: string; duration: number}>) {
    const passed = results.filter(r => r.status === 'passed').length;
    const failed = results.filter(r => r.status === 'failed').length;
    const skipped = results.filter(r => r.status === 'skipped').length;
    
    let rows = results.map(r => '<tr><td>' + r.name + '</td><td class="status-' + r.status + '">' + r.status + '</td><td>' + r.duration + 'ms</td></tr>').join('\n    ');
    
    const html = '<!DOCTYPE html><html><head><title>Test Report</title>' +
      '<style>body{font-family:Arial,sans-serif;margin:20px}.summary{display:flex;gap:20px;margin-bottom:20px}' +
      '.stat{padding:15px;border-radius:8px;color:white}.passed{background:#4CAF50}.failed{background:#f44336}' +
      '.skipped{background:#ff9800}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:left}' +
      'th{background:#f5f5f5}.status-passed{color:#4CAF50}.status-failed{color:#f44336}.status-skipped{color:#ff9800}</style></head>' +
      '<body><h1>Test Execution Report</h1><p>Generated: ' + new Date().toISOString() + '</p>' +
      '<div class="summary"><div class="stat passed">Passed: ' + passed + '</div>' +
      '<div class="stat failed">Failed: ' + failed + '</div><div class="stat skipped">Skipped: ' + skipped + '</div></div>' +
      '<table><tr><th>Test Name</th><th>Status</th><th>Duration</th></tr>' + rows + '</table></body></html>';
    
    const reportPath = path.join(this.reportsDir, 'summary.html');
    fs.writeFileSync(reportPath, html);
    return reportPath;
  }
}

export { ReportHelper };
