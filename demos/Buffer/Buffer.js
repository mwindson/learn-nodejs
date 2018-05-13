// Buffer创建
// buf1:  <Buffer 00 00 00 00 00 00 00 00 00 00>
const buf1 = Buffer.alloc(10)
// buf2:  <Buffer 01 01 01 01 01 01 01 01 01 01>
const buf2 = Buffer.alloc(10, 1)
// buf3  <Buffer 01 02 03 04>
const buf3 = Buffer.from([1, 2, 3, 4])
// buf4  <Buffer 74 65 73 74>
const buf4 = Buffer.from('test')
// 由于allocUnsafe方法会导致Buffer含有旧数据，因此结果不确定
// 内容必须被初始化，用buf.fill()来初始化
const buf5 = Buffer.allocUnsafe(10)

// Buffer编码
const buf6 = Buffer.from('test')
console.log(buf6.toJSON())
// 中文
const buf = Buffer.from('这是缓')

const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
for(let i = 0; i < buf.length; i+=5){
  var b = Buffer.allocUnsafe(5);
  buf.copy(b, 0, i);
  console.log(decoder.write(b));
}
