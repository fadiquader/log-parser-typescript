export interface TransportInterface {
  write(log: string): any | void
  close(opts?: any): any | void
}
