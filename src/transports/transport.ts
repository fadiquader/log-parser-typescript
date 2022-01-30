export interface Transport {
  write(log: string): any | void
  close(opts?: any): any | void
}
