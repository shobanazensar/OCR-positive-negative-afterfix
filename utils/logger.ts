import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

interface LogContext {
  browser?: string;
  os?: string;
  testName?: string;
  step?: string;
}

type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'success';

/**
 * Enhanced Logger with browser, OS, and error tracking
 * Generates detailed logs for test execution
 */
class Logger {
  private logDir: string;
  private currentLogFile: string;
  private context: LogContext;

  constructor(logDir = './logs') {
    this.logDir = logDir;
    this.context = {};
    this.currentLogFile = '';
    this.ensureLogDir();
  }

  private ensureLogDir() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  /**
   * Set execution context (browser, OS, test name)
   */
  setContext(context: LogContext) {
    this.context = { ...this.context, ...context };
  }

  /**
   * Initialize log file for a test run
   */
  initTestLog(testName: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedName = testName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    this.currentLogFile = path.join(this.logDir, timestamp + '_' + sanitizedName + '.log');
    
    const systemInfo = this.getSystemInfo();
    this.writeToFile([
      '================================================================================',
      'TEST EXECUTION LOG',
      '================================================================================',
      'Test Name    : ' + testName,
      'Started At   : ' + new Date().toISOString(),
      'Browser      : ' + (this.context.browser || 'Not specified'),
      'OS           : ' + systemInfo.platform + ' ' + systemInfo.release,
      'Architecture : ' + systemInfo.arch,
      'Node Version : ' + process.version,
      'CPU Cores    : ' + systemInfo.cpus,
      'Memory       : ' + systemInfo.totalMemory,
      '================================================================================',
    ].join('\n'));
  }

  private getSystemInfo() {
    return {
      platform: os.platform(),
      release: os.release(),
      arch: os.arch(),
      cpus: os.cpus().length,
      totalMemory: Math.round(os.totalmem() / 1024 / 1024 / 1024) + 'GB',
      freeMemory: Math.round(os.freemem() / 1024 / 1024 / 1024) + 'GB',
      hostname: os.hostname(),
    };
  }

  private formatMessage(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const levelColors = {
      info: '📘',
      warn: '⚠️',
      error: '❌',
      debug: '🔍',
      success: '✅',
    };
    const icon = levelColors[level] || '📝';
    const contextStr = this.context.step ? ' [Step: ' + this.context.step + ']' : '';
    let logMessage = '[' + timestamp + '] ' + icon + ' [' + level.toUpperCase() + ']' + contextStr + ' ' + message;
    
    if (data) {
      if (data instanceof Error) {
        logMessage += '\n  Error: ' + data.message + '\n  Stack: ' + data.stack;
      } else {
        logMessage += '\n  Data: ' + JSON.stringify(data, null, 2);
      }
    }
    
    return logMessage;
  }

  private writeToFile(message: string) {
    if (this.currentLogFile) {
      fs.appendFileSync(this.currentLogFile, message + '\n');
    }
  }

  info(message: string, data?: any) {
    const formatted = this.formatMessage('info', message, data);
    console.log(formatted);
    this.writeToFile(formatted);
  }

  warn(message: string, data?: any) {
    const formatted = this.formatMessage('warn', message, data);
    console.warn(formatted);
    this.writeToFile(formatted);
  }

  error(message: string, error?: Error | any) {
    const formatted = this.formatMessage('error', message, error);
    console.error(formatted);
    this.writeToFile(formatted);
    
    // Also write to error-specific log
    const errorLogFile = path.join(this.logDir, 'errors.log');
    fs.appendFileSync(errorLogFile, formatted + '\n\n');
  }

  debug(message: string, data?: any) {
    if (process.env.DEBUG === 'true') {
      const formatted = this.formatMessage('debug', message, data);
      console.log(formatted);
      this.writeToFile(formatted);
    }
  }

  success(message: string, data?: any) {
    const formatted = this.formatMessage('success', message, data);
    console.log(formatted);
    this.writeToFile(formatted);
  }

  step(stepNumber: number, description: string) {
    this.context.step = String(stepNumber);
    this.info('Step ' + stepNumber + ': ' + description);
  }

  /**
   * Log test completion with summary
   */
  endTest(status: "passed" | "failed" | "skipped", duration: number) {
    const summary = [
      '================================================================================',
      'TEST COMPLETED',
      '================================================================================',
      'Status   : ' + status.toUpperCase(),
      'Duration : ' + duration + 'ms',
      'Ended At : ' + new Date().toISOString(),
      '================================================================================',
    ].join('\n');
    this.writeToFile(summary);
    if (status === 'passed') {
      this.success('Test completed successfully');
    } else if (status === 'failed') {
      this.error('Test failed');
    }
  }
}

export { Logger };
