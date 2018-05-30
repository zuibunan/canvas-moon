/**
 * 我点亮的星星
 * 素材使用一个7 x 1包含闪烁星星的7帧图片
 * 每次依次绘制第1 - 7 帧
 */
function getDistance(sx, sy, ex, ey) {
    return Math.pow(ex - sx, 2) + Math.pow(ey - sy, 2);
}

function  getDistance(obj1, obj2){  
 return Math.sqrt((obj1.x-ojb2.x) * (obj1.x - ojb2.x) + (obj1.y - ojb2.y) * (obj1.y - ojb2.y));  
}

function  getMoveOffset(start, end) {
    return function(distance) {
        // const z2 = Math.pow(distance, 2);
        const x = Math.abs(end.x - start.x);
        const y = Math.abs(end.y - start.y);
        const z = Math.sqrt(x * x + y * y);
        const offsetX = x * distance / z;
        const offsetY = y * distance / z;
        const xSign = end.x > start.x ? 1 : -1;
        const ySign = end.y > start.y ? 1 : -1;
        // const isEnd = false;
        // if (isEnd) return end;
        return {
          x: offsetX * xSign,
          y: offsetY *ySign,
        }
    }
}

export default class Stars {
    constructor(ctx, width, height, star, image, speed = 10) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.stars = [star];
        this.counts = 0;
        this.end = false;
        const starPic = new Image();
        starPic.src = image;
        this.starPic = starPic;
        this.direction = Math.random() > 0 ? 1 : -1;
        // const speed  = 10;
        this.moveOffset = getMoveOffset(
            {
              x: star.from.x,
              y: star.from.y,
            },
            {
                x: star.x,
                y: star.y,
            }
          )(speed);
    }
    /* setImage(image) {
        this.image = image;
    } */
    draw() {
        let ctx = this.ctx
        ctx.save()
        const starPic = this.starPic;
        // starPic.src = this.image;
        // ctx.globalAlpha = 0.2;
        ctx.fillStyle = 'white'
        this.stars.forEach(star => {
            const offset = this.moveOffset;
            const drawPos = {
                x: star.from.x + offset.x,
                y: star.from.y + offset.y,
            }

            if (drawPos.y <= star.y) {
                drawPos.x = star.x;
                drawPos.y = star.y;
                this.end = true;
            } else {
                star.from.x = drawPos.x;
                star.from.y = drawPos.y;
            }
            // console.log(star, drawPos, offset);
            // const distance = getDistance(star.from, star);
            // console.log('star: ', star, x, y);
            const frames = 7;
            const scale = 1;
            const starSize = 7 * 6.5;
            const eachWidth = starPic.width / frames * scale;
            const eachHeight = starPic.height * scale;
            console.log(eachWidth, eachHeight);

            // 中心发光效果
            if (!this.end) {
                var center = {
                    x: drawPos.x + starSize / 2, 
                    y: drawPos.y + starSize / 2,
                    r: starSize / 3
                }
                // ctx.globalAlpha = 0.5;
                var gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, center.r);
                // var gradient = ctx.createRadialGradient(drawPos.x + starSize / 2, drawPos.y + starSize / 2, 0, drawPos.x + starSize / 2, drawPos.y + starSize / 2, starSize);
                gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
                gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                ctx.fillStyle = gradient;
                // ctx.fillRect(drawPos.x, drawPos.y, starSize, starSize); 
                ctx.arc(center.x, center.y, center.r, 0, 2*Math.PI);
                ctx.fill();
            }
           
            // 星星旋转
            if (this.end) {
                const move = {
                    x: drawPos.x + eachWidth / 2,
                    y: drawPos.y + eachHeight / 2,
                }
                ctx.translate(move.x, move.y)
                ctx.rotate(this.direction * this.counts * (Math.PI / 360));
                ctx.translate(- move.x, -move.y)
            }
            ctx.drawImage(
                starPic, 
                star.frame * eachWidth, 0, // 剪切原点
                eachWidth, eachHeight, // 剪切宽高
                drawPos.x, drawPos.y, // 绘制原点
                eachWidth , eachHeight, // 绘制宽高
            );
        })
        ctx.restore()

        // 绘制计数
        this.counts++;
        // 运动停止后才开始闪烁
        if (this.end && this.counts % 10 === 0) {
            this.blink();
        }
    }

    //闪烁，星星半径每隔10帧随机变大或变小
    blink() {
        this.stars = this.stars.map(star=> {
            star.frame += 1;
            star.frame %= 7;
            // star.x += Math.random() * 1.5;
            // star.y += Math.random() * 1.5;
            return star
        })

    }
}