<!DOCTYPE html>  
<html>  
<head>  
    <meta charset="utf-8">  
    <title>上传文件</title>  
<body>  
	<script type="text/javascript">

		function ChangeMoney(c,m){ 

			//复制一个原始的传入的零钱,解决贪心算法的一个缺陷
			this._originmoney = m;

			//如果传入所有的零钱列表就赋值给changes否则为空数组
			this._changes = [];

			//用于盛放降序后的零钱
			this._orderchanges = [];

			//盛放最优解的数组
			this._bestway = [];

			//盛放用于比较的数组
			this._battleway = [];

			//判断传入的零钱列表是否为合法值
			try{
				//判断传入的零钱是否为数组并且需要找的零钱是不是数字
				if(c instanceof Array && typeof m === "number"){
					//如果可使用的零钱数量不为0，则继续下一步
					if(c.length>0){
						//将传入的零钱数组赋值给changes
						this._changes = c;
					}else{
						//如果传入的是数组但是没有零钱则退出
						return '备用零钱不能为空！请准备足够的零钱以备找零！'
					}
				}else{
					//如果传入的参数不对则提示用户进行参数修正
					throw new Error('ChangeMoney(c,n) c accept Array ,m accept Number;');
				}
			}catch(error){
				//传入的参数不合法
				throw new Error(error);
			}
			
			//贪心计算的主程序
			this.computerChanges = function(){
				//如果当前只有一个备选零钱则比较是否可以整除否则零钱找不开
				if(this._changes.length<2 && m%this._changes[0]!=0){
					return '你当前的零钱找不开';
				}else{
					//将传入的数组进行降序排列	
					this.weatherOrder();
					//如果排序好的数组为真,则进行计算
					if(this._orderchanges){
						//遍历降序的备用零钱
						for(var i=0;i<this._orderchanges.length;i++){
							if(m%this._orderchanges[i] === 0){//如果最大的可以整除零钱那么则取第一个整数
								var count = m/this._orderchanges[i];
								for(var k =0; k<count; k++){
									this._bestway.push(this._orderchanges[i])
								};
								//return this._bestway;
							}else if(m>this._orderchanges[i]){//如果第一个无法整除则进行模运算，取余数
								var yushu = m%this._orderchanges[i];
								var count = (m-yushu)/this._orderchanges[i];
								for(var k =0; k<count; k++){
									this._bestway.push(this._orderchanges[i])
								};
								m = yushu;
							}

							//判断第一个可以被整除的数字然后放入数组用于比较‘最优解’
							if(this._originmoney%this._orderchanges[i] === 0 && this._battleway.length === 0){
								var count = this._originmoney/this._orderchanges[i];
								for(var k =0; k<count; k++){
									this._battleway.push(this._orderchanges[i])
								};
							}

							//如果最后一个还是无法整除则提示当前备用的零钱中无法正确找零
							if( i === this._orderchanges.length-1){
								var value = m%this._orderchanges[this._orderchanges.length-1];
								if(value!=0){
									return '您当前的零钱不够找零还有还剩余:'+value;
								}
							}
						}
						//如果‘最优解’的长度大于可以被整除的数则返回可以被整数的数字，否则返回最优解
						return this._bestway.length>this._battleway.length?this._battleway:this._bestway;
					}else{
						throw new Error('_orderchanges length cannot 0;')
					}
				}
			}
	
			//判断是否需要降序排列
			this.weatherOrder = function(){
				//遍历传入的数组
				for(var i=0; i<this._changes.length-1; i++){
					//如果传入的就是降序的值则不进行排序，否则进行排序
					if(this._changes[i]>=this._changes[i+1]){
						this._orderchanges = this._changes;
					}else{
						//如果需要排序则调用排序方法
						this.orderChanges();
					}
				}
			}

			//降序算法
			this.orderChanges = function(){
				try{
					//调用Math的取最大值方法获取数组中最大的值
					var changesMax = Math.max.apply(this,this._changes);
					//将最大值放入排序的数组中
					this._orderchanges.push(changesMax);
					//找到原数组中出现最大值的下标
					var index = this._changes.indexOf(changesMax);
					//截取掉最大值
					this._changes.splice(index,1);
				}catch(error){
					throw new Error(error)
				}
				if(this._changes.length>0){
					//如果当前的数组还有至少两位则继续进行比较
					this.orderChanges();
				}
			}
	    }
		//备选零钱
		var chooseChanges = [11,5,1];
		//需要找零的钱
		var changes = 15;
		var money = new  ChangeMoney(chooseChanges,changes);
		document.write('找零'+changes+'：'+money.computerChanges())
	</script>
</body>  
</html>  
