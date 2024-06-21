/* 解决js计算精度问题 */
import { Decimal } from 'decimal.js';//引入
class Cal {
    jia(num1,num2) {
        return new Decimal(num1).add(new Decimal(num2))
    }
    jian(num1,num2) {
        return new Decimal(num1).sub(new Decimal(num2))
    }
    mul(num1,num2) {
        return new Decimal(num1).mul(new Decimal(num2))
    }
    chu(num1,num2) {
        return new Decimal(num1).div(new Decimal(num2))
    }
}
export const cal = new Cal();