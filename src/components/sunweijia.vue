<template>
	<div>
        故事的开始总是这样，适逢其会，猝不及防<br/>
        故事的结局总是这样，花开两朵，天各一方<br/>
	    <button @click="back">点我返回</button>
	</div>
</template>
 
<script>
    export default {
        methods:{
            back(){
                this.$router.push('/')
            }
        }
    }
</script>