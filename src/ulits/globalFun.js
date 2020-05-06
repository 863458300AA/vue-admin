import { MessageBox } from 'element-ui';
import store from '@/store/index.js'
export default{
	install(Vue,options){
			Vue.prototype.confirmBox = function({text='确定要删除吗',type='warning',tips='警告',confirmButtonClass='danger'}){
				return MessageBox.confirm(text, tips, {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								center:true,
								type,
								confirmButtonClass
							 })
			};
			Vue.prototype.btnPremi = function(premission){
					const button = store.getters['getRole/buttonPremission'];
					const user = store.getters['getRole/roles'];
					if(user[0] === 'admin') return true;
					return button.indexOf(premission) != -1
				}
	}
}