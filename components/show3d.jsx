"use client";

import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export default function Show3D({data}){

  const [monkeyName, setMonkeyName] = useState(data.name);
	const threeRef = useRef(null);
	const [font, setFont] = useState(null);
	const [texture, setTexture] = useState(null);
  const [wwidth, setWwidth] = useState(null);


	useEffect(() =>{
		const renderElem = () => {
			const flipTexture = texture.clone();
			flipTexture.needsUpdate = true;
			flipTexture.wrapT = THREE.RepeatWrapping;
			flipTexture.repeat.y = - 1;
			flipTexture.wrapS = THREE.RepeatWrapping;
			flipTexture.repeat.x = - 1;
			const threeWrapper = threeRef.current;
			const width = threeWrapper.offsetWidth;
			const height = threeWrapper.offsetHeight;
			const group = new THREE.Group();
			const scene = new THREE.Scene();
			const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
			renderer.setSize( width, height );
			const loader = new RGBELoader();
			loader.load('./christmas_photo_studio_04_1k.hdr', function ( texture ) {
				const pmremGenerator = new THREE.PMREMGenerator(renderer);
				const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
				texture.dispose(); 
				scene.environment = envMap
			} );

			const textOptions = {
				text: `${data.name}`,
				bevelEnabled: true,
				fontName: 'optimer', // helvetiker, optimer, gentilis, droid sans, droid serif
				fontWeight: 'bold' // normal bold
			};

			const textMeshOptions = {
				height: 0.025,
				size: 0.12,
				hover: 1,
				curveSegments: 8,
				bevelThickness: 0.01,
				bevelSize: 0.01
			};


			const option1 = {
					enableSwoopingCamera: false,
					enableRotation: true,
					transmission: 1,
					thickness: 0,
					roughness: 0.001,
					envMapIntensity: 3.0
				};
			const option2 = {
					enableSwoopingCamera: false,
					enableRotation: true,
					transmission: 1,
					thickness: 1.5,
					roughness: 0.01,
					envMapIntensity: 3.0
				};

			const material = new THREE.MeshPhysicalMaterial({
				transmission: 1,
				thickness: option1.thickness,
				roughness: option1.roughness,
				envMapIntensity: 2.0,
			});
			const texturedMat = new THREE.MeshPhysicalMaterial({
				map: texture,
				transmission: 0,
				thickness: option1.thickness,
				roughness: option1.roughness,
				envMapIntensity: 2.0,
			});
			const flipedTexturedMat = new THREE.MeshPhysicalMaterial({
				map: flipTexture,
				transmission: 0,
				thickness: option1.thickness,
				roughness: option1.roughness,
				envMapIntensity: 2.0,
			});
			const material1 = new THREE.MeshPhysicalMaterial({
				transmission: option1.transmission,
				thickness: option1.thickness,
				roughness: option1.roughness,
				envMapIntensity: 2.0,
				transparent: true,
			});
			const material2 = new THREE.MeshPhysicalMaterial({
				transmission: option2.transmission,
				thickness: option2.thickness,
				roughness: option2.roughness,
				envMapIntensity: 2.0,
			});
			// Create an array of materials for each face
			const texturedMats = [
					material,
					material,
					flipedTexturedMat,
					texturedMat,
					material,
					material,
			];

			const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );


			const axesHelper = new THREE.AxesHelper( 5 );

			const geometry = new THREE.BoxGeometry( 0.5, 0.08, 0.5 );
			const geometry_round = new RoundedBoxGeometry(0.6, 0.05, 0.8, 16, 0.2);
			geometry_round.groups.forEach((face, i) => {
				face.materialIndex = Math.floor(i % 2);
			});
			geometry_round.computeBoundingBox();

			const textGeo = new TextGeometry( textOptions.text, {
					font: font,
					size: textMeshOptions.size,
					height: textMeshOptions.height,
					curveSegments: textMeshOptions.curveSegments,
					bevelThickness: textMeshOptions.bevelThickness,
					bevelSize: textMeshOptions.bevelSize,
					bevelEnabled: textOptions.bevelEnabled 

				} );
			textGeo.computeBoundingBox();

			const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

			const textMesh1 = new THREE.Mesh( textGeo, material1 );

			textMesh1.position.x = centerOffset;
			textMesh1.position.y = textMeshOptions.hover;
			textMesh1.position.y = -0.25*(textGeo.boundingBox.max.y - textGeo.boundingBox.min.y) + 
				0.5*(geometry_round.boundingBox.max.y - geometry_round.boundingBox.min.y);
			textMesh1.position.z = -0.4*(geometry_round.boundingBox.max.z - geometry_round.boundingBox.min.z);

			textMesh1.rotation.x = Math.PI/2;
			textMesh1.rotation.y = 0;

			const textMesh2 = new THREE.Mesh( textGeo, material1 );

			textMesh2.position.x = -centerOffset;
			textMesh2.position.y = textMeshOptions.hover;
			textMesh2.position.y = 0.25*(textGeo.boundingBox.max.y - textGeo.boundingBox.min.y) -
				0.5*(geometry_round.boundingBox.max.y - geometry_round.boundingBox.min.y);
			textMesh2.position.z = -0.4*(geometry_round.boundingBox.max.z - geometry_round.boundingBox.min.z);

			textMesh2.rotation.x = Math.PI/2;
			textMesh2.rotation.y = Math.PI;

			const mesh = new THREE.Mesh( geometry_round, material1);
			const mesh2 = new THREE.Mesh( geometry, texturedMats);
			mesh2.position.z = 0.1*(geometry_round.boundingBox.max.z - geometry_round.boundingBox.min.z);
			group.add( textMesh1 );
			group.add( textMesh2 );
			group.add(mesh2);
			group.add(mesh);

			// scene.add(mesh);
			scene.add(group);
			// scene.add( axesHelper );
			renderer.setAnimationLoop( animation );

			camera.position.x = 0;
			camera.position.y = -0.86;
			camera.position.z = 0;
			camera.lookAt(scene.position);
			
			threeWrapper.appendChild(renderer.domElement);
				function animation( time ) {

					group.rotation.z = time / 1000;

					renderer.render( scene, camera );

			}
		}
		if (threeRef.current && threeRef.current?.offsetWidth && threeRef.current?.offsetHeight &&
				!threeRef.current?.childElementCount && font && texture)
			renderElem();
	}, [font, texture]);

  useEffect(()=> {
    if (data.name != monkeyName)
      location.reload();
  });

  useEffect(()=>{
    const resizeHandler = () => {
      if (window && window.innerWidth)
        window.location.reload();
    }

    let fontLoader = null;
    let loadedTexture = null;
    if (threeRef.current){
      const fontLoadPath = './font/helvetiker_regular.typeface.json';
      fontLoader = new FontLoader();
      fontLoader.load( fontLoadPath, function ( response ) {
        setFont(response);
        } );
      loadedTexture = new THREE.TextureLoader().load(`${data.atts.img}`);
      setTexture(loadedTexture);
    }

    if (window) 
      {
        setWwidth(window.innerWidth);
        window.addEventListener("resize", resizeHandler);
      }

    return () => {
      if (threeRef.current)
        loadedTexture.dispose();
      if (window)
        window.removeEventListener("resize", resizeHandler); 
    }
  }, []);

	return (
		<div className="flex flex-col w-[90%] h-[90%] max-xl:w-[80%] max-xl:h-[80%] justify-start
			max-sm:min-w-full max-sm:min-h-[100dvw]">
			<div className="flex flex-row justify-center items-start h-full w-full
				max-sm:min-h-[100dvw]"
				ref={threeRef} id="three">
			</div>
		</div>
	);
}
