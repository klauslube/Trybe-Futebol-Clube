export default interface IHash {
  salt: number,
  encrypt(text: string):string,
  compare(encryptText: string, planText: string):boolean
}
