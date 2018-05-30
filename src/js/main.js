import Stars from './Stars'
import Moon     from './Moon'
import Meteor   from './Meteor'
import MyStar   from './MyStar'
import log   from './Log'

 class FlagGame {
    constructor(id, options) {
        let canvas = document.getElementById(id);
        this.ctx = canvas.getContext('2d');
        // const originWidth = window.innerWidth;
        // const originHeight = window.innerHeight;
        const originWidth = canvas.clientWidth;
        const originHeight = canvas.clientHeight;
        const scale = 2;
        this.width = originWidth * scale
        this.height = originHeight * scale;
        this.ctx.translate(1 / scale, 1 / scale);
    
        canvas.width = this.width
        canvas.height = this.height
        this.options = options;
        this.init();
    }
    init() {
        //实例化月亮和星星。流星是随机时间生成，所以只初始化数组
        const { ctx, width, height } = this;
        const moon = new Moon(ctx, width, height, this.options.flag);
        this.moon = moon;

        const stars = new Stars(ctx, width, height, this.options.star);
        this.stars = stars;
        // const stars = [];

        const myStars = [];
        this.myStars  = myStars;

        let count = 0
        
        //每一帧动画生成函数
        let pause = false;
        const frame = ()=> {
            //每隔10帧星星闪烁一次，节省计算资源
            count++
            count % 20 == 0 && stars.blink()
            // count % 10 == 0 && myStar.blink()
            moon.draw()
            stars.draw()
            myStars.forEach(item => {
                item.draw();
            })
            requestAnimationFrame(frame)
        }
        frame()
    }
    transformPoint(number) {
        const rect = this.moon.getFlagRect();
        const area = rect.width * rect.height / 1000;
        const { width, height } = rect;
        const scale = width / height;

        const bHeight = Math.sqrt(area / scale );
        const bWidth = area / bHeight;

        // 总列数
        const cols = Math.floor (rect.width / bWidth);
        const row = number / cols;
        const col = number % cols;
        // console.log(`number: ${number}, bWidth: ${bWidth}, bHeight:${bHeight}`);
        // console.log(`rect: `, rect);
        // console.log(`rect: ${rect}`, `col:${col}`, `row:${row}`);
        return {
            x: (col * bWidth - bWidth / 2 ) + rect.x * 2,
            y: (row * bHeight - bHeight / 2) + rect.y,
        }
    }
    light(number, from, speed) {
        this.light2(this.transformPoint(number), from, speed);
    }
    setStars(list) {
        const points = list.map(number => {
            return this.transformPoint(number)
        })
        // console.log(list, points);
        this.stars.setStars(points);
    }
    setMyStars(list) {
        const {ctx, width, height } = this;
        const points = list.map((number, index) => {
            const point = this.transformPoint(number);
            console.dir(point)
            return new MyStar(ctx, width, height, {
                x: point.x,
                y: point.y,
                frame: (index + 3) % 7,
                from: {
                    x: width / 2,
                    y: 0,
                }
            }, this.options.star);
        })
        // console.log(list, points);
        this.myStars.push(...points);
    }
    light2(e, from, speed) {
        const { ctx, width, height } = this;
        console.log(e);
        const fromPosition = from ? from: { x: width/2, y: height};
        const star = new MyStar(ctx, width, height, {
            x: e.x,
            y: e.y,
            frame: 3,
            from: fromPosition
        }, this.options.star, speed)
        this.myStars.push(star);
    }
}

window.FlagGame = FlagGame;