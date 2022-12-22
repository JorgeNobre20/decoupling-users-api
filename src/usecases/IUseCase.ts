export interface UseCase<Input, OutPut> {
  exec: (data: Input) => Promise<OutPut>;
}
