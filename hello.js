console.log("Hey")
const math=require('./math')
// console.log(math.add(2,5));
const res=math.mul(2,5);
console.log(res);

const os=require('os');
console.log(os.cpus().length);
