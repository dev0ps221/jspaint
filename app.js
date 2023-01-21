
        let tool = ""
        let canvas = document.querySelector("#app")
        let options_app = document.querySelectorAll(".option_app")
        let event = false
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        let c = canvas.getContext("2d")
        let lastPos = false
        let drawStartPos = 0
        let lines = []
        let trackers = []

        const processDraw = (e) => {
            if(event === "drawing"){
                drawStartPos = {
                    x:e.clientX,
                    y:e.clientY
                }
            }

        }

        document.addEventListener(
            'mousemove',
            (e)=>{
                if(lastPos){

                    c.clearRect(0,0,window.innerWidth,window.innerHeight)

                }
                lastPos = {
                    x:e.clientX,
                    y:e.clientY
                }
                document.querySelectorAll(".tracker").forEach(
                    tracker=>{
                        tracker.parentNode.removeChild(tracker)
                    }
                )

                let horizontal = document.createElement('section'),
                vertical = document.createElement('section')
                horizontal.className ='horizon tracker'
                ,vertical.className = 'meridien tracker'
                horizontal.style.top = ""+e.clientY+""
                horizontal.style.width = "100%"
                horizontal.style.height = "0.5px"
                horizontal.style.position = "absolute"
                horizontal.style.background = "greenyellow"
                vertical.style.left = ""+e.clientX+""
                vertical.style.top = "0"
                vertical.style.position = "absolute"
                vertical.style.width = "1px"
                vertical.style.transform = "rotateZ(180deg)"
                vertical.style.height = "100%"
                vertical.style.background = "red"
                // vertical.style.position = "absolute"
                
                
                document.querySelector("body").appendChild(horizontal)
                document.querySelector("body").appendChild(vertical)
                // alert('yo')
                if(event=='drawing'){

                    c.beginPath()
                    c.moveTo(drawStartPos.x,drawStartPos.y)
                    c.lineTo(lastPos.x,lastPos.y)
                    c.fillStyle = 'black'
                    c.fill()
                    c.stroke()
                    c.closePath()
                }
                lines.forEach(
                    line=>{
                        c.beginPath()
                        c.moveTo(line[0].x,line[0].y)
                        c.lineTo(line[1].x,line[1].y,50)
                        c.stroke()
                        c.closePath()
                    }
                )
                c.beginPath()
                c.moveTo(e.clientX,e.clientY)
                c.arc(e.clientX,e.clientY,5,0,Math.PI*2,true)
                c.fillStyle = 'black'
                c.fill()
                c.stroke()
                c.closePath()
            }
        )
        canvas.addEventListener(
            'mousedown',
            processDraw,
            false
        )
        canvas.addEventListener(
            'mouseup',
            (e)=>{
                let drawEndPos = {
                    x:e.clientX,
                    y:e.clientY
                }
                c.beginPath()
                c.moveTo(drawStartPos.x,drawStartPos.y)
                c.lineTo(drawEndPos.x,drawEndPos.y)
                c.fillStyle = 'black'
                c.fill()
                c.stroke()
                c.closePath()
                lines.push([drawStartPos,drawEndPos])
                event = false
                drawStartPos=drawEndPos=0
            },
            false
        )
        canvas.addEventListener(
            'click',
            (e)=>{
                options_app.forEach(
                    option=>{
                        if(option.className.match("selected")!==null){
                            tool = option.id

                        }
                    }
                )
                event = event !== "drawing" ? "drawing" : false
            },
            false
        )
        (options_app)(
            option=>{
                option.addEventListener(
                    'click',
                    (e)=>{
                        if(e.target.className.match("selected") !== false){
                            tool = e.target.id
                            alert(tool)
                        }
                    }
                )
            }
        )