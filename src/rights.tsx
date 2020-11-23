const checkRights = {
    checkViewRights(module_name:any) {
     const viewdata:any = this.checkRightsData(module_name,'view');
    //  console.log("viewdata",viewdata);
      if(viewdata) {
        var flag = 0;
        if (viewdata.ind > -1) {
          if ("view" && viewdata.user_right[viewdata.ind].view === true) {
            flag = 1;
          }
        }
        // console.log("flag",flag);
        return flag === 1 ? true : false;
      }
    },
    checkAddRights(module_name: any) {
      const adddata:any = this.checkRightsData(module_name,'add');
      //  console.log("adddata",adddata);
      if(adddata) {
        var flag = 0;
        if (adddata.ind > -1) {
          // if ("view" && adddata.user_right[adddata.ind].view === true) {
          //   flag = 1;
          // }
          if ("add" && adddata.user_right[adddata.ind].add === true) {
            flag = 1;
          }
        }
        return flag === 1 ? true : false;
      }
    },
    checkEditRights(module_name: any) {
      const editdata:any = this.checkRightsData(module_name,'edit');
      if(editdata) {
        var flag = 0;
        if (editdata.ind > -1) {
          if ("view" && editdata.user_right[editdata.ind].view === true) {
            flag = 1;
          }
          if ("add" && editdata.user_right[editdata.ind].add === true) {
            flag = 1;
          }
          if ("edit" && editdata.user_right[editdata.ind].edit === true) {
            flag = 1;
          }
        }
        return flag === 1 ? true : false;
      }
    },
    checkDeleteRights(module_name: any) {
      const deletedata:any = this.checkRightsData(module_name,'delete');
      if(deletedata) {
        var flag = 0;
        if (deletedata.ind > -1) {
          if ("view" && deletedata.user_right[deletedata.ind].view === true) {
            flag = 1;
          }
          if ("delete" && deletedata.user_right[deletedata.ind].delete === true) {
            flag = 1;
          }
        }
        return flag === 1 ? true : false;
      }
    },
  
    checkRightsData(module_name:any,type:any) {
    //   const rightdata:any = localStorage.getItem('rolePreveliges');
    //   let user_right = JSON.parse(rightdata);
    //   // console.log("user_right",user_right)
    //   if (user_right && user_right.length) {
    //     if (module_name && type) {
    //       let ind = user_right.findIndex((x: any) => 
    //       x.menuItemController === "null" ? (
    //         x.menuItem === module_name
    //       ) : (
    //         x.menuItem === module_name
    //       )
    //       );
    //       return {
    //         user_right,ind
    //       }
    //     } else {
    //       return false;
    //     }
    //   } else {
    //     return false;
    //   }
    }
  
  }
   export default checkRights;