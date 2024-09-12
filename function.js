//模板格式
 const data = [
    {
        title: '1',
        children: [
            { text: 'linkdin求内推', copy: 'Hi, my name is Zhichuan Chen, and I am a graduate student at UMass. I am looking for an position as a full-time software engineer, Summer 2025. And LinkedIn recommended you to me and I wonder if you can refer me. I have full-time work experience and I think it will be a good fit for the position in your company. If you find this letter annoying, you just ignore it. Have a good day!'},
            { text: 'challenging ', copy: 'I believe that the most challenging thing the happened to me is refining a system. When I worked at my former company, a real easter agency company, it has a VR displaying system which it one of the systems that I maintained. It is a complicated system and an unstable one.  There were always two or three problems reported to me every day. And someday I decided to investigate this system and fix it.\nFirst, I looked at all the cases and followed the codes to figure out what\’s wrong within the system and it\’s a lot. It\’s not about one or two blocks of codes. The whole system and data flow should be changed. So, I made a list and a plan to fix it. During the whole fixing process, I needed to work with other teams (both upstream and downstream), reconsider the data flow and DB design, testing and steps of going live.\nIt\’s hard, time-consuming and needs lots of thinking. And I worked it out. During the fixing, the problems that happen every day were going down. At the end, the system went stable and has at most one problem every month.\nWith this experience, I have learned that think carefully when you are trying to build a system. It\’s better to correct it in the first place than anytime else. Because it\’s easier and cost effective.\n'},
            { text: 'activities or student groups ', copy: 'I had been a leader of the basketball team of College of Information in Beijing Forestry University. And we broke the college record and won 2nd place in the final game of Beijing Forestry University\'s basketball game.'},
            { text: 'technical project', copy: 'The technical project that you\'re most proud of is a module display and management system.\nWhen I was an intern in Ke Holdings, Inc. I got a task like changing the image displayed on the website. I did it and it\'s well done. Several days later, a similar task was assigned to me. I started to think of building a system that can change images or text displaying on the website. Once you make a change in the management system, the display website changes too.\nThe idea got approved.  And I worked on it. I planned and wrote a document about building the system, then I talked to a front-end engineer about the system. We had an agreement on data exchange and began to work. I used PHP and Laravel to build a web server and used MySQL as a database.  Providing data in JSON to font-end and displaying in Website. It\'s amazing after it went online. It shortened a task like replacing an image from 1 day to 1 minute.\n' },
            { text: 'Career goals', copy: 'I like programming and solving problems with everything. It feels good. And I also like putting people together and working together, aiming for the same goal.\nMy career goal in recent years is to become a good programmer, doing something fun and making apps that being loved by lots of people.\nIn ten years, I want to be a good leader, guiding a team to conquer difficult problems repeatedly.\n' },
            { text: 'good fit.', copy: '' }
        ]
    }
 ];



function createPopup() {
    //--------------------------------------------------------------------------------------------------------------- 创建div容器 和 页面简单配置
    const container = document.createElement('div');
    container.id = 'draggable';
    container.className = 'draggable';
    container.innerHTML  = `
        <div class="top-bar" id="topBar" 
                style="
                    position: sticky; 
                    top: 0px; 
                    padding: 0px; 
                    display: flex; 
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-start; 
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
                    border-top-left-radius: 12px; 
                    background-color: white; 
                    zIndex: 1; 
                    border-top-right-radius: 12px;"
        >
            <div id = 'div1' style="display: flex; align-items: center; width: 100%; padding: 10px 5px 0px 5px; ">
                <input type="text" id="searchBox" 
                    style="flex-grow: 1; 
                    padding: 7px 12px; 
                    border: 1px solid #ccc; 
                    border-radius: 6px; 
                    background: rgba(255, 255, 255, 0.9); 
                    color: #4A4A4A; 
                    margin-right: 10px; 
                    width: 65%; 
                    box-shadow: inset 0 0 2px rgba(0,0,0,0.05);" placeholder="搜索文本...">

                <button id="closeButton" 
                    style="background-color: #F76C6C; 
                    color: white; border: none; 
                    padding: 12px 24px; 
                    font-size: 10px; 
                    text-align: center; 
                    text-decoration: none; 
                    display: inline-block; 
                    border-radius: 8px; 
                    transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s; 
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" 
                    onmouseover="this.style.backgroundColor='#da190b'; this.style.transform='scale(1.05);';" 
                    onmouseout="this.style.backgroundColor='#F76C6C'; this.style.transform='scale(1)';"
                >收缩</button>
            </div>
        </div>
        <div class="content" style='width:100%;'>
        <ul id="textList">
          <!-- 文本列表将在这里动态生成 -->
        </ul>
        </div>
      `;
    container.style.width = '400px';
    container.style.height = '300px';
    container.style.paddingLeft = '0px';
    container.style.border = '1px solid #ccc'; 
    container.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    container.style.borderRadius = '8px';
    container.style.overflowY = 'auto';
    container.style.position = 'absolute'
    container.style.zIndex = '1000';
    container.style.right = '0%';
    container.style.top = '0%';
    container.style.display = 'block';
    container.style.fontSize = '15px';
    container.style.fontFamily = '\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif';
    container.style.background = 'white';


    // 添加到body
    document.body.appendChild(container);
    
    //---------------------------------------------------------------------------------------------------------------拖拽代码
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;    
    container.addEventListener('mousedown', function(e) {
        if (document.body.offsetWidth > 500) {
            isDragging = true;
        }
      offsetX = e.clientX - container.offsetLeft;
      offsetY = e.clientY - container.offsetTop;
      e.preventDefault();
    }); 
    document.addEventListener('mousemove', function(e) {
      if (isDragging) {
        container.style.left = e.clientX - offsetX + 'px';
        container.style.top = e.clientY - offsetY + 'px';
      }
    }); 
    document.addEventListener('mouseup', function() {
      isDragging = false;
    });


    //---------------------------------------------------------------------------------------------------------------closeButton 隐藏和关闭悬浮框悬浮框
    const closeButton = document.getElementById('closeButton'); 
    const draggable = document.getElementById('draggable');
    const div1 = document.getElementById('div1');

    if (document.body.offsetWidth > 500) {
        draggable.style.height = '40px';
        draggable.style.width = '90px';
        draggable.style.overflow = 'auto';
        searchBox.style.display = 'none';
        closeButton.style.top = '0px';
        closeButton.textContent = '小工具';
        div1.style.padding = '0px';
        draggable.querySelector('.content').style.display = 'none';
    }

    closeButton.addEventListener('click', function() {
        toggleCollapsed(draggable);
    });
    
    if (document.body.offsetWidth < 500) {
      closeButton.style.display   = 'none';
    }

    //缩放悬浮框
    function toggleCollapsed(draggableElement) {
        const parentElement = draggableElement.parentElement;
        const closeButton = document.getElementById('closeButton'); 
        const parentRect = parentElement.getBoundingClientRect();
        const closeButtonRect = closeButton.getBoundingClientRect();
    
        if (draggableElement.style.height === '40px') {

            // 如果已经是折叠状态，恢复到原始状态
            draggableElement.style.width = '400px';
            draggableElement.style.height = '300px';
            draggableElement.style.paddingLeft = '0px';
            draggableElement.style.border = '1px solid #ccc'; 
            draggableElement.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            draggableElement.style.borderRadius = '8px';
            draggableElement.style.overflow = 'auto';
            draggableElement.style.position = 'absolute';
            draggableElement.style.zIndex = '1000';
            draggableElement.style.fontFamily = '\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif';
    
            draggableElement.querySelector('.content').style.display = ''; // 显示.content
            closeButton.textContent = '缩小';
            searchBox.style.display = 'flex';
    
            // 调整元素位置，使其相对于关闭按钮定位
            const draggableRect = draggableElement.getBoundingClientRect();
            draggableElement.style.left = `${closeButtonRect.left - draggableRect.width + closeButtonRect.width}px`;
            draggableElement.style.top = `${closeButtonRect.top}px`;
    
        } else {

            // 否则，设置为折叠状态
            draggableElement.style.width = '90px';
            draggableElement.style.height = '40px';
            draggableElement.style.overflow = 'auto';
            searchBox.style.display = 'none';
            closeButton.style.top = '0px';
            closeButton.textContent = '小工具';
            draggableElement.querySelector('.content').style.display = 'none';
            // 调整关闭按钮的位置
            closeButton.style.top = '0px';
            closeButton.style.right = '0px';
            draggableElement.style.left = `${closeButtonRect.left-10}px`;
            draggableElement.style.top = `${closeButtonRect.top - 2}px`;
        }
    }

    //关闭悬浮框
    document.addEventListener('keydown', function(event) {
        // 检查是否同时按下了Ctrl和b键
        if (event.ctrlKey && event.key === 'b' && container.style.display === 'none') {
             container.style.display = 'block';
        } else if (event.ctrlKey && event.key === 'b' && container.style.display === 'block') {
             container.style.display = 'none';
        }
    });

    //按键缩放悬浮框    // 检查是否同时按下了alt b键
    document.addEventListener('keydown', function(event) {
        // 检查是否同时按下了Ctrl和b键
        if (event.altKey && event.key === 'b' && container.style.display === 'none') {
            toggleCollapsed(draggable);
        } else if (event.altKey && event.key === 'b' && container.style.display === 'block') {
            toggleCollapsed(draggable);
        }
    });

    closeButton.onmouseover = function() {
        const notice = document.createElement('div');
        notice.style.width = '150px';
        notice.style.textAlign = 'center';
        notice.style.backgroundColor = 'rgba(140, 169, 169, 0.9)';
        notice.style.position = 'fixed';
        notice.style.left = '50%';
        notice.style.top = '80%';
        notice.style.transform = 'translate(-50%, -50%)';
        notice.style.padding = '10px';
        notice.style.border = '1px solid white';
        notice.innerText = 'ctrl+B 隐藏/显示 \nAlt+B 缩放';
        document.body.appendChild(notice);
        setTimeout(() => {
            document.body.removeChild(notice);
        }, 1000);
    };


    //---------------------------------------------------------------------------------------------------------------展示列表，级联和过滤功能
   function displayTexts(filter = '') {

    const list = document.getElementById('textList');
    list.innerHTML = '';
    list.style.padding = '10px';
    list.style.borderBottom = '1px solid #e0e0e0';
    list.style.fontFamily = '"Segoe UI", Arial, sans-serif';
 

    function toggleChildren(parentLi, childrenUl) {
        if (childrenUl.style.display === 'block') {
            childrenUl.style.display = 'none';          
        } else {
            childrenUl.style.display = 'block';     
        }
    }

    data.forEach(parent => {
        const parentTitleMatch = parent.title.toLowerCase().includes(filter.toLowerCase());

        const childrenMatch = parent.children.some(child => 
            filter !== '' && (child.text.toLowerCase().includes(filter.toLowerCase()) ||  child.hasOwnProperty('copy') && child.copy.toLowerCase().includes(filter.toLowerCase()))
        );

        if (parentTitleMatch || childrenMatch) {
            const parentLi = document.createElement('li');
            parentLi.textContent = parent.title;

            parentLi.style.fontSize = '15px';
            parentLi.style.fontWeight = '500';
            parentLi.style.borderTop = '1px solid #EDEDED';
            parentLi.style.borderLeft = '1px solid #EDEDED';
            parentLi.style.borderBottom = '3px solid #EDEDED';
            parentLi.style.cursor = 'pointer';
            parentLi.style.transition = 'color 0.3s ease';
            parentLi.style.display = 'flex';
            parentLi.style.justifyContent = 'space-between';
            parentLi.style.alignItems = 'center';
            parentLi.style.transition = 'background-color 0.2s ease-in-out';
            parentLi.style.left = '0px';
            parentLi.style.width = '100%';
            parentLi.style.padding = '10px';
            parentLi.style.boxShadow = "1px 2px 4px rgba(0, 0, 0, 0.05)";

            const childrenUl = document.createElement('ul');
            childrenUl.classList.add('hidden');
            childrenUl.style.paddingLeft = '3px'
            childrenUl.style.listStyle = 'none';
            childrenUl.style.padding = '10px';
            childrenUl.borderBottom = "1px solid #e0e0e0";
            childrenUl.style.backgroundColor = "#f0f9ff";
            childrenUl.style.display = 'block';
            


            let filteredChildren;
            if (parentTitleMatch) {
                filteredChildren= parent.children;
            }

            if (childrenMatch){
                filteredChildren= parent.children.filter(child => 
                    child.text.toLowerCase().includes(filter.toLowerCase()) ||  
                    child.hasOwnProperty('copy') && child.copy.toLowerCase().includes(filter.toLowerCase())
                );
            }


            const childLis = filteredChildren.map(child => {

                const childLi = document.createElement('li');
                childLi.style.display = 'flex';
                childLi.style.alignItems = 'center';
                childLi.style.padding = '7px 10px';
                childLi.style.transition = 'all 0.3s ease';
                childLi.style.cursor = 'pointer';

                //title文本
                const childText = document.createElement('span');
                childText.textContent = child.text;
                childText.style.flex = '1';
                childText.style.color = '#333'; // 更改颜色
                childText.style.fontSize = '15px'; // 设置字体大小
                childLi.appendChild(childText);

                //如果存在copy文本，创建复制框
                let childButtonText;
                if (child.copy) {
                    childButtonText = document.createElement('span');
                    childButtonText.textContent = child.copy ? child.copy.slice(0, 20) + '...' : '';
                    childButtonText.title = child.copy || ''; // 设置title属性以显示工具提示

                    childButtonText.style.flex = '1';
                    childButtonText.style.color = '#666'; // 更改颜色
                    childButtonText.style.fontSize = '15px'; // 字体大小
                    childButtonText.style.textOverflow = 'ellipsis';
                    childButtonText.style.overflow = 'hidden';
                    childButtonText.style.whiteSpace = 'nowrap';
                    childButtonText.style.marginLeft = '10px'; 

                    childButtonText.addEventListener('dblclick', function() {

                        //复制方法，odin不支持
                        //navigator.clipboard.writeText(child.copy);
                        //使用隐藏文本的方式
                        const textarea = document.createElement('textarea');
                        textarea.value = child.copy;
                        textarea.style.position = 'absolute';
                        textarea.style.left = '-9999px'; // 将其放置在不可见的位置
                        document.body.appendChild(textarea);
                        textarea.select();
                        textarea.setSelectionRange(0, 99999); // 对于长文本
                        document.execCommand('copy');
                        document.body.removeChild(textarea);




                        // 显示复制成功的提示
                        const tooltip = document.createElement('div');
                        tooltip.style.width = '100px';
                        tooltip.style.textAlign = 'center';
                        tooltip.style.backgroundColor = 'rgba(140, 169, 169, 0.2)';
                        tooltip.style.position = 'fixed';
                        tooltip.style.left = '50%';
                        tooltip.style.top = '80%';
                        tooltip.style.transform = 'translate(-50%, -50%)';
                        tooltip.style.padding = '10px';
                        tooltip.style.border = '1px solid white';
                        tooltip.style.zIndex = '1000';
                        tooltip.innerText = '复制成功';
                        document.body.appendChild(tooltip);
                        setTimeout(() => {
                            document.body.removeChild(tooltip);
                        }, 800);
                    });
                    childLi.appendChild(childButtonText);
                };

                 //如果存在跳转链接，创建按钮
                let childButton;
                if (child.link) {
                    childButton = document.createElement('button');
                    childButton.textContent = '点击跳转';
                    childButton.target = '_blank';
                    childLi.addEventListener('click', function() {
                        window.open(child.link, '_blank');
                    });
                    // 设置按钮靠右
                    childButton.style.flexShrink = 0;
                    childButton.style.display = 'flex';
                    childButton.style.right = '10px';
                    childButton.style.color = 'white';
                    childButton.style.border = '3px black';
                    childButton.style.backgroundColor = '#C0D9D9';
                    childButton.style.borderRadius = '4px';
                    childButton.style.cursor = 'pointer';
                    childLi.appendChild(childButton);
                }

                childLi.addEventListener('mouseover', () => {
                    childLi.style.background = '#E9F5FF';
                    childLi.style.paddingLeft = '12px';
                });

                childLi.addEventListener('mouseout', () => {
                    childLi.style.background = 'transparent';
                    childLi.style.paddingLeft = '0';
                });

                return childLi;
            });


            // 将子元素附加到DOM树中
            childLis.forEach(childLi => {
                childrenUl.appendChild(childLi);
            });

            // 将父元素和子元素附加到DOM树中
            list.appendChild(parentLi);
            list.appendChild(childrenUl);

            // 绑定点击事件
            parentLi.addEventListener('click', () => toggleChildren(parentLi, childrenUl));
        };
        });
    }


    //---------------------------------------------------------------------------------------------------------------点击悬浮框时，获取输入框焦点
    const topBar = document.getElementById('topBar'); 
    topBar.addEventListener('click',function(event){
        searchBox.focus();
    });

    //---------------------------------------------------------------------------------------------------------------输入框调取
    document.getElementById('searchBox').addEventListener('input', function() {
      displayTexts(this.value);
    });

    //输入框无数据时候调取方法
    displayTexts('');
};

window.onload = function() {
  createPopup();
};


//---------------------------------------------------------------------------------------------------------------------------------- 埋点
//--------------------------------------------------------------------------------------------------------------- 获取cookie
function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookies = decodedCookies.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        // Remove any leading spaces from the cookie value.
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    
    // Return null if the cookie is not found.
    return null;
}

//
//
//                     _ooOoo_
//                    o8888888o
//                    88" . "88
//                    (| -_- |)
//                    O\  =  /O
//                 ____/`---'\____
//               .'  \\|     |//  `.
//              /  \\|||  :  |||//  \
//             /  _||||| -:- |||||-  \
//             |   | \\\  -  /// |   |
//             | \_|  ''\-/''  |   |
//             \  .-\__  `-`  ___/-. /
//           ___`. .'  /-.-\  `. . __
//        ."" '<  `.___\_<|>_/___.'  >'"".
//       | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//       \  \ `-.   \_ __\ /__ _/   .-` /  /
//  ======`-.____`-.___\_____/___.-`____.-'======


