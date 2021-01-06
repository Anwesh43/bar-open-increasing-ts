const w : number = window.innerWidth 
const h : number = window.innerHeight
const parts : number = 4  
const scGap : number = 0.02 / parts 
const strokeFactor : number = 90 
const hFactor : number = 8.9 
const wFactor : number = 0.8 
const barWFactor : number = 0.5 
const backColor : string = "#bdbdbd"
const colors : Array<string> = [
    "#F44336",
    "#4CAF50",
    "#3F51B5",
    "#FF5722",
    "#795548"
]  
const delay : number = 20 


class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawBarOpenIncreaing(context : CanvasRenderingContext2D, scale : number) {
        const lw : number = Math.min(w, h) * wFactor  
        const lh : number = Math.min(w, h) / hFactor 
        const barW : number = Math.min(w, h) * barWFactor
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const sf4 : number = ScaleUtil.divideScale(sf, 3, parts) 
        context.save()
        context.translate(0, h / 2)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.translate(0, -lh / 2 + j * lh)
            DrawingUtil.drawLine(context, 0, 0, lw * sf1, 0)
            context.restore()
        }
        DrawingUtil.drawLine(context, lw, -lh / 2, lw, -lh / 2 + lh * sf2)
        DrawingUtil.drawLine(context, barW, -lh / 2, barW, -lh / 2 + lh * sf3)
        context.fillRect(barW - barW * sf4, -lh / 2, barW * sf4, lh)
        context.restore()
    }

    static drawBOINode(context :CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        context.fillStyle = colors[i]
        DrawingUtil.drawBarOpenIncreaing(context, scale)
    }
}