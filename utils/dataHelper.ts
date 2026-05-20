import * as fs from 'fs';
import * as path from 'path';

/**
 * Data Helper
 * Test data generation and management utilities
 */
class DataHelper {
  /**
   * Generate random string
   */
  static randomString(length = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random email
   */
  static randomEmail(domain = 'test.com'): string {
    return 'test_' + Date.now() + '_' + this.randomString(5) + '@' + domain;
  }

  /**
   * Generate random number
   */
  static randomNumber(min = 0, max = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random phone number
   */
  static randomPhone(): string {
    return '+1' + this.randomNumber(200, 999) + this.randomNumber(200, 999) + this.randomNumber(1000, 9999);
  }

  /**
   * Generate random date
   */
  static randomDate(start = new Date(2020, 0, 1), end = new Date()): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  /**
   * Generate UUID
   */
  static uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Load test data from JSON file
   */
  static loadJson<T>(filePath: string): T {
    const fullPath = path.resolve(filePath);
    const data = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(data);
  }

  /**
   * Load test data from CSV file
   */
  static loadCsv(filePath: string): Record<string, string>[] {
    const fullPath = path.resolve(filePath);
    const data = fs.readFileSync(fullPath, 'utf8');
    const lines = data.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      return row;
    });
  }

  /**
   * Parameterize test data
   */
  static parameterize<T>(testCases: T[]): T[] {
    return testCases;
  }

  /**
   * Deep clone object
   */
  static clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Merge objects
   */
  static merge<T extends object>(target: T, ...sources: Partial<T>[]): T {
    return Object.assign({}, target, ...sources);
  }

  /**
   * Timestamp generator
   */
  static timestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Format date
   */
  static formatDate(date: Date, format = 'YYYY-MM-DD'): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day);
  }
}

export { DataHelper };
