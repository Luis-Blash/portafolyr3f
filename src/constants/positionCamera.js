export const positionCameraConstants = {
    default: {
        cameraPosition: [5.11, 4.77, 4.58],
        cameraTarget: [-2.2, 0.6, -1.8]
    },
    pantallaProyectos: {
        cameraPosition: [-0.38, 2.3642487741797544, -1.1061844426588365],
        cameraTarget: [-0.41, 1.86184291717213, -7.713550944859704]
    },
    pantallaAbout: {
        cameraPosition: [0.7413386802819684, 3.1990253727323275, -0.2298406988353251],
        cameraTarget: [-9.602765759498606, 1.0965048071306067, -0.5589464723047646]
    },
    pantallaContact: {
        cameraPosition: [-0.8306129306768346, 1.9945956424219844, -1.9117406009644213],
        cameraTarget: [-6.661979546237406, 0.33574592171125717, -10.558866192687136]
    }
}

export const positionCameraConstantsMobile = {
    ...positionCameraConstants,
    pantallaProyectos: {
        cameraPosition: [-0.38, 2.3642487741797544, -1.7],
        cameraTarget: [-0.41, 1.86184291717213, -7.713550944859704]
    },
}