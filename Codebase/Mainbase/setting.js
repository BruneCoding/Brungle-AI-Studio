function loadMenu(item) {
    const viewPort = document.querySelector(".setting-viewport");

    viewPort.innerHTML = `
        <div class='long-range-weapon' style='opacity: 0.484'></div>
        <div class='action-container'>
            <i class='fa-2xl fa-solid fa-circle-notch fa-spin-pulse' style='color: #ededed; height: 4.84vh; width: 4.84vh'></i>
        </div>
    `;

    const delay = 0.242 + Math.random() * (0.484 - 0.121);

    setTimeout(() => {
        if (item === "General") {
            viewPort.innerHTML = `
                <div class="long-range-weapon" style="opacity: 0.42;"></div>
                <div class="action-container">
                    <div class="actions-left"><h3>Theme</h3></div>
                    <div class="actions-right">
                        <div class="actions-choices">
                            <h3>Dark</h3>
                            <div class="icon-holder-actions"><i class="fa-solid fa-caret-down"></i></div>
                        </div>
                    </div>
                </div>
                <div class="long-range-weapon"></div>
                <div class="action-container">
                    <div class="actions-left"><h3>Accent Color</h3></div>
                    <div class="actions-right">
                        <div class="actions-choices">
                            <h3>Yellow</h3>
                            <div class="icon-holder-actions"><i class="fa-solid fa-caret-down"></i></div>
                        </div>
                    </div>
                </div>
                <div class="long-range-weapon"></div>
                <div class="action-container">
                    <div class="actions-left"><h3>Spoken Language</h3></div>
                    <div class="actions-right">
                        <div class="actions-choices">
                            <h3>English (UK)</h3>
                            <div class="icon-holder-actions"><i class="fa-solid fa-caret-down"></i></div>
                        </div>
                    </div>
                </div>
                <div class="long-range-weapon"></div>
            `;
        } else if (item === "Sounds") {
            viewPort.innerHTML = `
                <div class="long-range-weapon"></div>
                <div class="action-container">
                    <div class="actions-left"><h3>Notifications</h3></div>
                    <div class="actions-right">
                        <div class="actions-choices">
                            <h3>On</h3>
                            <div class="icon-holder-actions"><i class="fa-solid fa-caret-down"></i></div>
                        </div>
                    </div>
                </div>
                <div class="long-range-weapon"></div>
                <div class="action-container">
                    <div class="actions-left"><h3>Sounds</h3></div>
                    <div class="actions-right">
                        <div class="actions-choices">
                            <h3>Default</h3>
                            <div class="icon-holder-actions"><i class="fa-solid fa-caret-down"></i></div>
                        </div>
                    </div>
                </div>
                <div class="long-range-weapon"></div>
            `;
        } else if (item === "Personal") {
            viewPort.innerHTML = `
                <div class="long-range-weapon"></div>
                <div class="action-container">
                    <div class="actions-left"><h3>Personalisation</h3></div>
                    <div class="actions-right">
                        <div class="actions-choices">
                            <h3>On</h3>
                            <div class="icon-holder-actions"><i class="fa-solid fa-caret-down"></i></div>
                        </div>
                    </div>
                </div>
                <div class="long-range-weapon"></div>
                <div class="action-container">
                    <div class="actions-left"><h3>Chat Style</h3></div>
                    <div class="actions-right">
                        <div class="actions-choices">
                            <h3>Default</h3>
                            <div class="icon-holder-actions"><i class="fa-solid fa-caret-down"></i></div>
                        </div>
                    </div>
                </div>
                <div class="long-range-weapon"></div>
                <div class="action-container">
                    <div class="actions-left"><h3>Custom Instructions</h3></div>
                    <div class="actions-right">
                        <input type="text" placeholder="Type here..." 
                            style="padding: 0.5em; border-radius: 8px; border: 1px solid #ccc; background-color: #1e1e2f; color: #ededed; width: 100%;">
                    </div>
                </div>
                <div class="long-range-weapon"></div>
            `;
        }
    }, delay * 1000);
}



function settingSelect(here) {
    const topNavText = document.getElementById("top-nav-text");
    
    const settingSide = document.querySelector(".setting-sidebar");

    
    const items = settingSide.children; 
    for (let item of items) {
        item.classList.remove("active");
    }


    here.classList.add("active");

    
    if (here.innerHTML.includes("General")) {
        topNavText.innerHTML = "General";
        loadMenu("General");
    } 
    
    else if (here.innerHTML.includes("Sounds")) {
        topNavText.innerHTML = "Sounds and Notifications";
        loadMenu("Sounds");
    } 

    else if (here.innerHTML.includes("Personalisation")) {
        topNavText.innerHTML = "Personalisation";
        loadMenu("Personal");
    } 

    else if (here.innerHTML.includes("Addons")) {
        topNavText.innerHTML = "Addons ( Extensions )";
        loadMenu("Addons");
    } 

    else if (here.innerHTML.includes("Data Controls")) {
        topNavText.innerHTML = "Data Controls";
        loadMenu("Data");
    } 

    else if (here.innerHTML.includes("Security")) {
        topNavText.innerHTML = "Security";
        loadMenu("Security");
    } 
}






