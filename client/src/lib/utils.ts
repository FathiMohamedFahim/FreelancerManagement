import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj instanceof Date && !isNaN(dateObj.getTime())
      ? new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(dateObj)
      : '';
  } catch {
    return '';
  }
}

export function formatCurrency(amount: number | string | null | undefined, currency = 'USD'): string {
  if (amount === null || amount === undefined) return '';
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) return '';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(numAmount);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getInitials(name: string): string {
  if (!name) return '';
  
  const parts = name.split(' ');
  
  if (parts.length === 1) {
    return name.substring(0, 2).toUpperCase();
  }
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function calculateDuration(startTime: Date | string, endTime?: Date | string): number {
  if (!startTime || !endTime) return 0;
  
  const start = typeof startTime === 'string' ? new Date(startTime) : startTime;
  const end = typeof endTime === 'string' ? new Date(endTime) : endTime;
  
  if (!(start instanceof Date) || !(end instanceof Date) || 
      isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 0;
  }
  
  // Return duration in minutes
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

export function generateTimeOptions(): { label: string; value: string }[] {
  const options = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < 24 * 4; i++) {
    const time = new Date(now.getTime() + i * 15 * 60 * 1000);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    
    const label = `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    const value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    options.push({ label, value });
  }
  
  return options;
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function formatTime(time: string | Date): string {
  if (!time) return '';
  
  const date = typeof time === 'string' ? new Date(time) : time;
  
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }
  
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
}