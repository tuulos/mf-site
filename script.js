var slideDelay = 3000;

const List = function _List() {
  return `
  <ul style="transform: translateY(${
    (List.state.id === "modeling" && "0px") ||
    (List.state.id === "deployment" && "calc(-96px - 16px)") ||
    (List.state.id === "versioning" && "calc(2 * (-96px - 16px))") ||
    (List.state.id === "orchestration" && "calc(3 * (-96px - 16px))") ||
    (List.state.id === "compute" && "calc(4 * (-96px - 16px))") ||
    (List.state.id === "data" && "calc(5 * (-96px - 16px))")
  })">
    <li>
        <img src="/images/hero/modeling.svg" alt="" />
        <div>
          <p>Modeling</p>
                    <small>
                      Use any Python libraries for models and business logic. Metaflow
                      helps manage libraries locally and in the cloud.
                      </small>
        </div>
    </li>
    <li>
        <img src="/images/hero/deployment.svg" alt="" />
        <div>
          <p>Deployment</p>
                    <small>
                      Deploy workflows to production with a single command and
                      integrate with surrounding systems seamlessly.
                    </small>
        </div>
    </li>
    <li>
        <img src="/images/hero/versioning.svg" alt="" />
        <div>
          <p>Versioning</p>
                    <small>
                      Metaflow tracks and stores variables inside the flow
                      automatically for easy experiment tracking and debugging.
                      </small>
        </div>
    </li>
    <li>
        <img src="/images/hero/orchestration.svg" alt="" />
        <div>
          <p>Orchestration</p>
                    <small>
                      Create robust workflows in plain Python. Develop and debug
                      them locally, deploy to production without changes.
                    </small>
        </div>
    </li>
    <li>
        <img src="/images/hero/compute.svg" alt="" />
        <div>
          <p>Compute</p>
                    <small>
                      Leverage the cloud to execute functions at scale. Use GPUs,
                      multiple cores, and large amounts of memory as needed. 
                    </small>
        </div>
    </li>
    <li>
        <img src="/images/hero/data.svg" alt="" />
        <div>
          <p>Data</p>
                    <small>
                      Access data from data warehouses. Metaflow flows
                      data across steps, versioning everything on the way.
                    </small>
        </div>
    </li>
    </ul>
        `;
};

const Image = function _Image() {
  if (List.state.id !== "orchestration") {
    return (
      "translateY(" +
      ((List.state.id === "deployment" && "650%") ||
        (List.state.id === "versioning" && "1050%") ||
        (List.state.id === "compute" && "1350%") ||
        (List.state.id === "data" && "1650%") ||
        "550%") +
      ") translate3d(0, 0, 0)"
    );
  } else {
    return "translateY(1260%) scaleY(15.4)";
  }
};

Image.state = {
  id: "modeling",
};

var toDeployment;
var toVersioning;
var toOrchestration;
var toCompute;
var toData;
var toModeling;

const clearAllTimeouts = () => {
  clearTimeout(toDeployment);
  clearTimeout(toVersioning);
  clearTimeout(toOrchestration);
  clearTimeout(toCompute);
  clearTimeout(toData);
  clearTimeout(toModeling);
};

List.state = {
  id: "modeling",
  modeling: () => {
    setState(() => {
      List.state.id = "modeling";
      Image.state.id = "modeling";
    });
    toDeployment = setTimeout(() => {
      List.state.deployment();
    }, slideDelay);
  },
  deployment: () => {
    setState(() => {
      List.state.id = "deployment";
      Image.state.id = "deployment";
    });
    toVersioning = setTimeout(() => {
      List.state.versioning();
    }, slideDelay);
  },
  versioning: () => {
    setState(() => {
      List.state.id = "versioning";
      Image.state.id = "versioning";
    });
    toOrchestration = setTimeout(() => {
      List.state.orchestration();
    }, slideDelay);
  },
  orchestration: () => {
    setState(() => {
      List.state.id = "orchestration";
      Image.state.id = "orchestration";
    });
    toCompute = setTimeout(() => {
      List.state.compute();
    }, slideDelay);
  },
  compute: () => {
    setState(() => {
      List.state.id = "compute";
      Image.state.id = "compute";
    });
    toData = setTimeout(() => {
      List.state.data();
    }, slideDelay);
  },
  data: () => {
    setState(() => {
      List.state.id = "data";
      Image.state.id = "data";
    });
    toModeling = setTimeout(() => {
      List.state.modeling();
    }, slideDelay);
  },
};

const setState = (callback) => {
  callback();
  updateTree();
  clearAllTimeouts();
};

const removeEventListeners = () => {
  const list = document.querySelectorAll("button");
  list.forEach((item) => {
    item.removeEventListener("click", List.state.modeling);
    item.removeEventListener("click", List.state.deployment);
    item.removeEventListener("click", List.state.versioning);
    item.removeEventListener("click", List.state.orchestration);
    item.removeEventListener("click", List.state.compute);
    item.removeEventListener("click", List.state.data);
  });
};

const updateTree = () => {
  document.getElementById("list_container").innerHTML = List();
  document.getElementById("highlight").style.transform = Image();
  removeEventListeners();

  if (List.state.id === "modeling") {
    document
      .getElementById("next")
      .addEventListener("click", List.state.deployment);
    document.getElementById("prev").addEventListener("click", List.state.data);
  }
  if (List.state.id === "deployment") {
    document
      .getElementById("next")
      .addEventListener("click", List.state.versioning);
    document
      .getElementById("prev")
      .addEventListener("click", List.state.modeling);
  }
  if (List.state.id === "versioning") {
    document
      .getElementById("next")
      .addEventListener("click", List.state.orchestration);
    document
      .getElementById("prev")
      .addEventListener("click", List.state.deployment);
  }
  if (List.state.id === "orchestration") {
    document
      .getElementById("next")
      .addEventListener("click", List.state.compute);
    document
      .getElementById("prev")
      .addEventListener("click", List.state.versioning);
  }
  if (List.state.id === "compute") {
    document.getElementById("next").addEventListener("click", List.state.data);
    document
      .getElementById("prev")
      .addEventListener("click", List.state.orchestration);
  }
  if (List.state.id === "data") {
    document
      .getElementById("next")
      .addEventListener("click", List.state.modeling);
    document
      .getElementById("prev")
      .addEventListener("click", List.state.compute);
  }
};

document.getElementById("scroller").addEventListener("click", () => {
  clearAllTimeouts();
  slideDelay = 30000;
});

updateTree();

toDeployment = setTimeout(() => {
  List.state.deployment();
}, slideDelay);