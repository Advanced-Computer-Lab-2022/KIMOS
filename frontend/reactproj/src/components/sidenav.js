import React, { useState, useEffect } from 'react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GavelIcon from '@mui/icons-material/Gavel';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DiscountIcon from '@mui/icons-material/Discount';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person2Icon from '@mui/icons-material/Person2';

export default function Sidenav({userType}) {

  const adminItems = [

    {title:'Dashboard',
    icon:<DashboardIcon/>,
    href:''},

    {title:'Add Users',
    icon:<GroupAddIcon/>,
    href:'addUsers'},

    {title:'Reports',
    icon:<GavelIcon/>,
    href:'reports'},

    {title:'Requests',
    icon:<MenuBookIcon/>,
    href:'courseRequests'},

    {title:'Promotions',
    icon:<DiscountIcon/>,
    href:'promotions'},
    ]



    const instructorItems = [

        {title:'Dashboard',
        icon:<DashboardIcon/>,
        href:''},

        {title:'Profile',
        icon:<Person2Icon/>,
        href:'profile'},

        {title:'contract',
        icon:<GavelIcon/>,
        href:'contracts'},
    
        {title:'My Courses',
        icon:<LibraryBooksIcon/>,
        href:'myCourses'},
    
        {title:'Add Course',
        icon:<MenuBookIcon/>,
        href:'createCourse'},
    
        ]

    const indItems = [

        {title:'Profile',
        icon:<Person2Icon/>,
        href:'profile'},

        {title:'Top Courses',
        icon:<WhatshotIcon/>,
        href:'topCourses'},
    
        {title:'My Courses',
        icon:<LibraryBooksIcon/>,
        href:'myCourses'},
    
        {title:'My Reports',
        icon:<GavelIcon/>,
        href:'myReports'},
    
        ]

    const corItems = [

        {title:'Profile',
        icon:<Person2Icon/>,
        href:'profile'},

        {title:'Top Courses',
        icon:<WhatshotIcon/>,
        href:'topCourses'},
    
        {title:'My Courses',
        icon:<LibraryBooksIcon/>,
        href:'myCourses'},
    
        {title:'My Reports',
        icon:<GavelIcon/>,
        href:'myReports'},

        {title:'Request Access',
        icon:<SwitchAccessShortcutIcon/>,
        href:'requestCourseAccess'},
    
        ]
        
  const [menu, setMenu] = useState(adminItems);
  useEffect(() => {
    if(userType === 'admin') setMenu(adminItems);
    if(userType === 'instructor') setMenu(instructorItems);
    if(userType === 'individual trainee') setMenu(indItems);
    if(userType === 'corporate trainee') setMenu(corItems);
  },[]);
  const changeHref = (link) =>{
    var type = userType;
    if(type === 'individual trainee' || type === 'corporate trainee')
        type = 'user'
    window.location.href = '/'+type+'/'+link;
  }

  const activeItem = (url)=>{
    if(url===''){
      var returnFlag = true;
      menu.forEach((item)=>{
        if(item.href !==''){
          if(window.location.href.indexOf(item.href) > -1){
            returnFlag = false;

          } 
        }
      })

      return returnFlag;
    }
    else{
      return window.location.href.indexOf(url) > -1
    }
  }
  const sidenavItem = (menuItem)=>{
    return ( 
        <div className={`${activeItem(menuItem.href)? 'sidenav__content__item-active':'sidenav__content__item'}`} onClick={()=>changeHref(menuItem.href)}>   
            <div className='sidenav__content__item__icon'>{menuItem.icon}</div>
            <div className='sidenav__content__item__title'>{menuItem.title}</div>
        </div>
    )
  }


  return (
    <div className='sidenav'>
        <div className='sidenav__content'>
            {menu.map(menuItem=>{
                return sidenavItem(menuItem)
            })}
 

        </div>
    </div>
  )
}
