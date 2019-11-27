
import keys from '../../constants/keys';


const routes = {


    changeDescription: `${keys.HOST}/changeDescription`,
    changeName: `${keys.HOST}/changeName`,
    getAllResponsibilities: `${keys.HOST}/responsibility.json`,

    addNewLine: `${keys.HOST}/addNewLine`,
    setResponsibility: `${keys.HOST}/setResponsibility`,
    removeResponsibilityLine: `${keys.HOST}/removeResponsibilityLine`,
    addNewType: `${keys.HOST}/addNewType`,
    changeTypeName: `${keys.HOST}/changeTypeName`,

    createSection: `${keys.HOST}/createSection`,
    removeSection: `${keys.HOST}/removeSection`,
    changeSectionName: `${keys.HOST}/changeSectionName`,
    getAllUsers: `${keys.HOST}/users.json`
    
}


export default routes;
