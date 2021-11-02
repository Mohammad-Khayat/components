export default{
    state:{
        list :[
            {
                name:'mohamamd',
                age:'18'
            },
            {
                name:'mahmoud',
                age:'12'
            },
            {
                name:'ahmad',
                age:'22'
            },
            {
                name:'abdlullah',
                age:'32'
            },
            {
                name:'abdulkader',
                age:'32'
            },
            {
                name:'abdulaziz',
                age:'32'
            },
            {
                name:'abd',
                age:'23'
            },
            {
                name:'wael',
                age:'23'
            },
            {
                name:'noor',
                age:'23'
            },
            {
                name:'yousef',
                age:'23'
            },
            {
                name:'ali',
                age:'23'
            },
            {
                name:'adnan',
                age:'23'
            },
            {
                name:'amal',
                age:'23'
            },
            
            
        ],
        keyWord:''
    },
    mutations:{
        setKeyWord(state,payload){
            console.log(payload)
            state.keyWord=payload;
        }
    },
    getters:{
        filteredList(state){
            if(state.keyWord){
                return state.list.filter( el => el.name.indexOf(state.keyWord)!= -1)
            }
            else{
                return state.list
            }
        }
    }
    
}