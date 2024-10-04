i have a nextjs project where i have a dataset of objects with just x,y properties (coordinates). i need to create a graph that meets these acceptance criteria:

1. considers the center of the graph (div/container) 0,0
    ex. a div of 1000px height and width would have 0,0 at 500px x 500px. { x: -14, y: 27 } would place a dot at left: 486px top: 527px
2. is able to zoom in and out, expecting that it will consume datapoints that differentiate points typically in degrees of 50's, where the uppermost datapoint may be 1000000,1000000, and the smallest may be -1000000,-1000000, but the scale will be according to:

export const ratios: { [key: string]: number } = {
    0: 1/1,
    1: 2/1,
    2: 4/1,
    3: 8/1,
    4: 16/1,
    5: 32/1,
    6: 64/1,
    7: 128/1,
    8: 256/2,
    9: 562/1,
}

with zoom function:

export const zoom = (scale: number, x: number, y: number) => {
    const ratio = bodyRatios[scale];
    return {
        x: x * ratio,
        y: y * ratio,
    };
}

and if the map position places 0,0 at 0px 0px, 
const points = {
    a: { x: 500, y: 0 }
}

ratios.0 renders points.a at left: 500px, top: 0px
ratios.1 renders points.a at left: 1000px, top: 0px
ratios.2 renders points.a at left: 2000px, top: 0px
    
zoom controls will be a plus and minus button in the top right corner of the graph, and the graph will be a div with a fixed height and width of the viewport height and width.

3. if we consider that the graph's size, at a 1:1 ratio, is equivalently the exact pixel height and width of the viewport, the graph should only be able to render points that would render within that pixel size when the scale is at ratios.0. 

this would mean that if the viewport is 2000px wide by 1500px tall, the 0,0 coordinate being at the very center would be at left: 1000px, top: 750px. a datapoint at 500,-250 would render at left: 1500px, top: 500px. 

4. there may be datapoints that exceed these values, from a range of -1000000 to 1000000. this will mean that there needs to be some sort of scroll function to scroll around the grid to view the entirety of the grid. this can be done with the w,a,s,d keys.

5. as a user zooms, both the container size increases (-2m,-2m then -4m,-4m) and the scale of distance changes, thus changing rendering positions, HOWEVER, 

6. to combat insane rendering issues, only objects within 10,000 pixels of the center of the viewport will be rendered, meaning,

7. the position in the graph, related to the scale of the graph, that is a the center of the viewport, must be tracked at all times. if, at ratios.0, the center position is at 1000,0, zoom to ratios.1 will keep it there, and the graph will scale in an expanding manner around it.

