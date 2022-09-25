// rainbow colors
// hsl_l = round(100*getIterantions(x_, y_));
// hsl_h = round(map(y, 0, h, 0, 360));
// c = color('hsl(' + hsl_h + ',100%,'+ hsl_l +'%)');

function getIterantions(ca, cb){
    let maxIterations = 100;
    
    let a = 0;
    let b = 0;

    let iterations = 0;

    while(iterations < maxIterations){
        let a_ = a*a - b*b + ca;
        b = 2*a*b + cb;
        a = a_;
        if(sqrt(a*a + b*b) > 2)
            break;

        iterations++;
    }

    return iterations/maxIterations;
}

let w = 360;
let h = 240;
let zoom;
let left_ = -1.8;
let right_ = 1.8;
let top_ = 1.2;
let bottom_ = -1.2;
let drawing_in_proccess = 0;

function setup(){
    createCanvas(w, h);

    for(var y=0; y<h; y++){
        for(var x=0; x<w; x++){
            let x_ = map(x, 0, w, left_, right_);
            let y_ = map(y, 0, h, top_, bottom_);
            
            let br = 255*getIterantions(x_, y_);
            set(x, y, [0,br,br,255]);
        }
    }

    updatePixels();
}

function mouseWheel(event){
    if(event.delta < 0)
        zoom = 0.8;
    else
        zoom = 1.25;

    if(mouseX >=0 && mouseX <= w && mouseY >= 0 && mouseY <=h && !drawing_in_proccess){
        drawing_in_proccess = 1;

        let mouse_x = map(mouseX, 0, w, left_, right_);
        let mouse_y = map(mouseY, 0, h, top_, bottom_);

        left_ = mouse_x - (mouse_x - left_)*zoom;
        right_ = mouse_x + (right_ - mouse_x)*zoom;
        bottom_ = mouse_y - (mouse_y - bottom_)*zoom;
        top_ = mouse_y + (top_ - mouse_y)*zoom;
    
        for(var y=0; y<h; y++){
            for(var x=0; x<w; x++){
                let x_ = map(x, 0, w, left_, right_);
                let y_ = map(y, 0, h, top_, bottom_);
                
                let br = 255*getIterantions(x_, y_);
                
                set(x, y, [0,br,br,255]);
            }
        }

        updatePixels();

        drawing_in_proccess = 0;
    }
}