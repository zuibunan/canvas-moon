import Stars from './Stars'
import Moon     from './Moon'
import Meteor   from './Meteor'
import MyStar   from './MyStar'
import log   from './Log'

export default class Flag {
    constructor(id) {
        let canvas = document.getElementById(id);
        this.ctx = canvas.getContext('2d');
        this.width = window.innerWidth
        this.height = window.innerHeight
    
        canvas.width = this.width
        canvas.height = this.height
        this.init();
    }
    init() {
        // let canvas = document.getElementById('canvas'),
        ctx = this.ctx;
        //实例化月亮和星星。流星是随机时间生成，所以只初始化数组
        moon = new Moon(ctx, width, height);
        stars = new Stars(ctx, width, height, 100);
        myStars = [];
        meteors = [];
        count = 0
    
        canvas.width = width
        canvas.height = height
        
        //流星生成函数
        const meteorGenerator = ()=> {
            //x位置偏移，以免经过月亮
            let x = Math.random() * width + 800
            meteors.push(new Meteor(ctx, x, height))
        
            //每隔随机时间，生成新流星
            setTimeout(()=> {
                meteorGenerator()
            }, Math.random() * 2000)
        }
        
        canvas.addEventListener('click', e => {
            // meteors.push(new Meteor(ctx, width / 2, e.layerY))
            console.log(e);
            myStars.push(new MyStar(ctx, width, height, {
                x: e.layerX,
                y: e.layerY,
                frame: 0,
                from: {
                x: width / 2,
                y: height,
                }
            }))
        })
        
        //每一帧动画生成函数
        let pause = false;
        const frame = ()=> {
            //每隔10帧星星闪烁一次，节省计算资源
            count++
            count % 20 == 0 && stars.blink()
            // count % 10 == 0 && myStar.blink()
            moon.draw()
            // moon.drawFlag();
            stars.draw()
            // myStar.draw();
        
            myStars.forEach(item => {
                item.draw();
            })
        
            /* meteors.forEach((meteor, index, arr)=> {
                //如果流星离开视野之内，销毁流星实例，回收内存
                if (meteor.flow()) {
                    meteor.draw()
                } else {
                    arr.splice(index, 1)
                }
            }) */
            // log('frame...');
            if (pause) return;
            requestAnimationFrame(frame)
        }
        
        // meteorGenerator()
        
        document.addEventListener('visibilitychange', function() {
            pause = document.visibilityState === 'hidden';
        })
        
        frame()
    }
}
