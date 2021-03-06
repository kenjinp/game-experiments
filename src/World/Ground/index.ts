import BABYLON, { Mesh, Scene } from "babylonjs";

class TiledGround extends Mesh.CreateTiledGround {
  constructor(scene: Scene) {
    // Tiled Ground Tutorial

    // Part 1 : Creation of Tiled Ground
    // Parameters
    let xmin = -20;
    let zmin = -20;
    let xmax = 20;
    let zmax = 20;
    let precision = {
      w: 2,
      h: 2
    };
    let subdivisions = {
      h: 20,
      w: 20
    };
    // Create the Tiled Ground
    super(
      "Tiled Ground",
      xmin,
      zmin,
      xmax,
      zmax,
      subdivisions,
      precision,
      scene
    );

    // Part 2 : Create the multi material
    // Create differents materials
    var whiteMaterial = new BABYLON.StandardMaterial("White", scene);
    whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

    var blackMaterial = new BABYLON.StandardMaterial("Black", scene);
    blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    // Create Multi Material
    var multimat = new BABYLON.MultiMaterial("multi", scene);
    multimat.subMaterials.push(whiteMaterial);
    multimat.subMaterials.push(blackMaterial);

    // Part 3 : Apply the multi material
    // Define multimat as material of the tiled ground
    this.material = multimat;

    // Needed variables to set subMeshes
    var verticesCount = this.getTotalVertices();
    var tileIndicesLength =
    this.getIndices().length / (subdivisions.w * subdivisions.h);

    // Set subMeshes of the tiled ground
    this.subMeshes = [];
    var base = 0;
    for (var row = 0; row < subdivisions.h; row++) {
      for (var col = 0; col < subdivisions.w; col++) {
        this.subMeshes.push(
          new BABYLON.SubMesh(
            row % 2 ^ col % 2,
            0,
            verticesCount,
            base,
            tileIndicesLength,
            this
          )
        );
        base += tileIndicesLength;
      }
    }
  }
}
export default TiledGround;
