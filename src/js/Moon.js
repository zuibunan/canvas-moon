export default class Moon {
    constructor(ctx, width, height, image) {
        this.ctx = ctx
        this.width = width
        this.height = height
        // this.images = images;
        // debugger;
        const picFlag = new Image();
        picFlag.src = image;
        this.picFlag = picFlag;
        picFlag.onload = e => {
            this.ready = true;
        }
        // console.log(images);
        // this.drawBg();
        this.draw();
    }
    getFlagRect() {
        return this.flagRect;
    }
    drawFlag() {
        const ctx = this.ctx;
        const pic = this.picFlag;
        // pic.src = this.images.flag;
        ctx.save()
        // ctx.globalAlpha = 0.51;
        const offsetX = 20;
        const offsetY = 70;
        const drawWidth = this.width - offsetX * 2;
        const drawHeight = drawWidth * pic.height / pic.width;
        this.flagRect = {
            x: offsetX,
            y: offsetY,
            width: drawWidth,
            height: drawHeight,
        }
        ctx.shadowBlur = 80;
        ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
        // ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        // ctx.shadowColor = "RGB(255,246,33, 0.8)";
        // ctx.shadowColor = "RGB(189,0,10, 0.8)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 50;
        // ctx.clearRect(offsetX, offsetY, drawWidth, drawHeight);
        ctx.drawImage(
            pic, 
            0, 0, pic.width, pic.height,
            offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore()
    }
    drawBg() {
        const ctx = this.ctx;
        ctx.save()
        ctx.clearRect(0, 0, this.width, this.height);
        // ctx.globalAlpha = 0.1;
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, 0, this.width, this.height);
        // const drawWidth = this.width - 20;
        // ctx.drawImage(
        //     pic, 
        //     0, 0, pic.width, pic.height,
        //     0, 0, this.width, this.height);
        ctx.restore()
    }
    draw() {
        this.drawBg();
        this.drawFlag();
    }
    draw1() {
        let ctx = this.ctx,
            gradient = ctx.createRadialGradient(
            200, 200, 30, 100, 200, 800)
        //径向渐变
        gradient.addColorStop(0, 'rgb(255,255,255)')
        gradient.addColorStop(0.01, 'rgb(70,70,80)')
        gradient.addColorStop(0.2, 'rgb(40,40,50)')
        gradient.addColorStop(0.4, 'rgb(20,20,30)')
        gradient.addColorStop(1, 'rgb(0,0,10)')
        ctx.save()
        // ctx.fillStyle = gradient
        // ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, 0, this.width, this.height)
        ctx.restore()
    }
}