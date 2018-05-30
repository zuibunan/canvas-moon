export default class Stars {
    constructor(ctx, width, height, image) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.stars = []
        // this.stars = []
        this.count = 0;
        const starPic = new Image();
        starPic.src = image;
        this.starPic = starPic;
    }
    getStars(amount) {
        let stars = []
        while (amount--) {
            stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                r: Math.random() + 2.7
            })
        }
        return stars
    }
    setStars(pos) {
        this.stars = pos.map(item => {
            return {
                x: item.x,
                y: item.y,
                r: Math.random() + 1.5,
                frame: Math.floor(Math.random() * 7),
            }
        });
    }
    draw() {
        let ctx = this.ctx
        ctx.save()
        // ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        const starPic = this.starPic;
        const frames = 7;
        const starSize = 7 * 3;
        const eachWidth = starPic.width / frames;
        const eachHeight = starPic.height;
        this.stars.forEach(star=> {
            // ctx.globalAlpha = star.frame % 3;
            // var gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r);
            // gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
            // gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
            // ctx.fillStyle = gradient;
            ctx.drawImage(
                starPic, 
                star.frame * eachWidth, 0, // 剪切原点
                eachWidth, eachHeight, // 剪切宽高
                star.x, star.y, // 绘制原点
                starSize , starSize, // 绘制宽高
            );
            // ctx.beginPath()
            // ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI)
            // ctx.fill()
        })
        this.count += 1;
        ctx.restore()
    }
    getMove(x, y) {
        const center = {
            x: this.x / 4,
            y: this.y / 2
        }
        // const [x, y] = [
        //     ox - center.x,
        //     oy - center.y,
        // ]
        const move = Math.random() * 2;
        const angle = 1;
        // const x1 = Math.cos(angle) * x - Math.sin(angle) * y;
        // const y1 = Math.cos(angle) * y + Math.sin(angle) * x;

        const x1= (x - center.x)*Math.cos(angle) - (y - center.y)*Math.sin(angle) + center.x ;
        const y1= (x - center.x)*Math.sin(angle) + (y - center.y)*Math.cos(angle) + center.y ;

        return {
            x: x1,
            y: y1,
        }
    }
    //闪烁，星星半径每隔10帧随机变大或变小
    blink() {
        this.stars = this.stars.map(star=> {
            let sign = Math.random() > 0.5 ? 1 : -1
            star.r += sign * 0.2
            if (star.r < 0) {
                star.r = -star.r
            } else if (star.r > 1.5) {
                star.r -= 0.2
            }
            star.frame += 1;
            star.frame %= 7;
            // const move = this.getMove(star.x, star.y);
            // star.x = star.x += sign;
            // star.y = star.y += sign;
            // if (this.count % 10 == 0) {
            // }
            return star
        })

    }
}