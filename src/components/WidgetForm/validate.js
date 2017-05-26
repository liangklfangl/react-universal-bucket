/**
 * (1)validate的签名为validate : (values:Object, props:Object) => errors:Object [optional]
 *    这是一个同步的验证函数，接收第一个参数为reudx-form的value，第二个参数是传入到
 *    你组件的props。如果验证通过，那么应该返回{},如果验证失败，那么要以下面的形式来返回
 *    错误信息。
 *    { field1: <String>, field2: <String> }该验证函数的默认值为:
 *    (values, props) => ({}).
 */
const validate = values => {
  const errors = {}
  if (!values.id) {
    errors.id = '必填项'
    //判断是否数字方法1
  } else if (typeof(+values.id)!=="number") {
    errors.id = 'id值必须是数字'
  }
  if (!values.color) {
    errors.color = '必填项'
  } 
  if(!values.owner){
    errors.owner="必填项";
  }
  if (!values.sprocketCount) {
    errors.sprocketCount = '必填项'
    //判断是否是数字方法2
  } else if (isNaN(Number(values.sprocketCount))) {
    errors.sprocketCount = 'sprocketCount必须是数字'
  return errors
 }
}

/**
 * (2)如果warning的检查通过，那么应该返回{},如果失败那么要返回下面的类型
 *    { field1: <String>, field2: <String> }默认值为如下函数:
 *    (values, props) => ({})。
 */
const warn = values => {
  const warnings = {}
  if (values.id >1000) {
    warnings.id = 'id有点大~~'
  }
  return warnings
}

module.exports = {
  warn,
  validate
}