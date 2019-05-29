import ajax from  "Utils/ajax";


export default store => next => action => {
		if(!action){
			return;
		}


		if(action.payload){
			const oldType = action.type;
			let p;

			//TODO暂时只处理了get/post,以及promise
			if(action.payload.post){
				const {url,data,config} = action.payload.post

				

				p = ajax.post(url,data,config);
			}else if(action.payload.get){
				const {url,config} = action.payload.get
				p = ajax.get(url,config);
			}

			if(p){
				let requestAction,successAction,failureAction;

				if(toString.call(oldType)==='[object Array]'){
					requestAction = oldType[0];
					if(oldType.length === 2){
						successAction = oldType[1]+"_SUCCESS";
						failureAction = oldType[1]+"_FAILURE";
					}else if(oldType.length === 3){
						successAction = oldType[1];
						failureAction = oldType[2];
					}else{
						console.error("传入的action数组个数必须为2或者3");
					}
				}else{
					requestAction = oldType+"_REQUEST";
					successAction = oldType+"_SUCCESS";
					failureAction = oldType+"_FAILURE";
				}

				action.type = requestAction;
				delete action.payload;
				next(action);

				return p.then((res)=>{
					action.type = successAction;	
					action.res = res;		
				})
				.catch(()=>{
					action.type = failureAction;
				})
				.then(()=>{
					next(action);
				})
			}
		}

		return next(action);
}