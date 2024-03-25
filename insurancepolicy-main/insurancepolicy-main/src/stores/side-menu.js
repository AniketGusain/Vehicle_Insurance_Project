import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Layers",
        title: "Policies",
        subMenu: [
          {
            icon: "",
            pathname: "/dashboard/addpolicy",
            title: "Add policy",
          },
          {
            icon: "",
            pathname: "/dashboard/policyrequests",
            title: "View requests",
          },
        ]
      },
      
        ],
      },
  
});

const usersideMenu = atom({
  key : "usersidemenu",
  default:{
     menu: [
       {
         icon: "Layers",
         title: "Policies",
         subMenu: [
           {
             icon: "",
             pathname: "/dashboard/availablepolicies",
             title: "Available Policies",
           },
           {
             icon: "",
             pathname: "/dashboard/appliedpolicies",
             title: "Applied polices",
           },
         ]
       },
     ]
  }  
});

export { sideMenu, usersideMenu };
