import {Particles} from 'react-tsparticles'
import {loadFull} from 'tsparticles'
import React , {useCallback} from 'react'

const ParticlesContainer = () => {
  //init
  const particlesInit = useCallback(async (engine)=>{
    await loadFull(engine);

  },[])

  const particlesLoaded = useCallback(async () =>{},[]);


  return (
    <Particles  
      className='w-full h-full absolute translate-z-0'
      id='trsparticles'
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
            color: {
                value: "",
            },
        },
        fpsLimit: 30,
        interactivity: {
            events: {
              
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#ffb500",
            },
            links: {
                color: "#ffb700",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
            },
            collisions: {
                enable: true,
            },
            move: {
                directions: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed:2,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.3,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
    }}
    
    />

    
  );
};

export default ParticlesContainer;
