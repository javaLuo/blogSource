/** 判断当前环境是否是PC端 **/
export const isPc = () => {
    const userAgentInfo = navigator.userAgent.toLowerCase();
    const Agents = ["android", "iphone", "symbianOS", "windows phone", "ipad", "ipod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.includes(Agents[v])) { flag = false; break; }
    }
    return flag;
};