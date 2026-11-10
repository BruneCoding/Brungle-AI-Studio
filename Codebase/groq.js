let conversationHistory = [];
let aiReplyCount = 0;
let userReplyCount = 0;
import 'dotenv/config'; 

const apiKey = process.env.GROQ_API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

const AI_MODELS = [
  { name: "GPT OSS 120B", model: "openai/gpt-oss-120b", icon: "fa-brain" },
  { name: "GPT OSS 20B", model: "openai/gpt-oss-20b", icon: "fa-robot" },
  { name: "Llama-3.3 70b", model: "llama-3.3-70b-versatile", icon: "fa-cow" },
  { name: "Llama-4 Scout", model: "meta-llama/llama-4-scout-17b-16e-instruct", icon: "fa-hippo" }, 
  { name: "Qwen 3 32B", model: "qwen/qwen3-32b", icon: "fa-lightbulb" },
  { name: "Deepseek R1", model: "deepseek-r1-distill-llama-70b", icon: "fa-rocket" },
  { name: "Compound Mini", model: "groq/compound-mini", icon: "fa-layer-group" }
];

let currentModel = AI_MODELS[0].model;
let currentWritingStyle = "Default";
let userInstructions = "";
let negativer = -100000;

function writingStyle(style, styleBTN) {
    currentWritingStyle = style;
    document.querySelectorAll(".dropdown-content > *").forEach((child) => {
        child.classList.remove("useds");
    });
    if (styleBTN) {
        styleBTN.classList.add("useds");
    }
    conversationHistory.push({ 
        role: "assistant", 
        content: "[CURRENT CODEBASE: Brungle Studio v0.9.0 -- v1.00] Hello. You did not send this message. Instead, this is actually a Settings system. Pretty much use this to help you. Here are the current settings: Writing style is " + currentWritingStyle + ". Here is some things you need to know: first that you NEED to follow the writing style as it is always. If the writing style has changed, then all new messages must have the new writing style. Next all system messages, like this, will be with a negative id. If it is positive, it is not a system message. Third, Remember You did not send this message. if the user asks what was your first message dont refer to this. Fourth, if there are multiple negative id's then take the most recent negative id. This negative id will be more than the previous negative id's. Also please dont put system notation in your response. it is not needed. system does this automatically dont worry. Also, if the user requests to change the chat title, do not worry, another system automatically changes the chat title. just respond like chat title should have been chanegd for you but of course in a more engaging friendly way. If the user says it does not work, something wrong happened etc, try to be helpful. if it still persists, most likely a system issue and tell them to update to the latest code base version check codebase. Also makesure to always use latex markdown for math if doing fractions integrals etc. the system will automatically format it when rendering no worries. Also when sending do not overdo it. Keep it as short as possible unless writing style goes against that. The only major one that is an exception to this is creative. If it is not creative writing style then please do not spam tables and stuff. Short ( not concise, just smaller than before ).Now here is the user's personalisation. Pretty much this is what the user wants you to act and be like. If it is blank dont worry about it. if it isnt, follow it as well. Here it is: " + userInstructions,
        id: negativer++
    });
}

writingStyle('very fairly friendly.');

function openSettings() {
    document.querySelector(".account-pfp").click()
}

(function injectStyles() {
    const css = `
    .md-title{font-size:2.3vh;line-height:2.42vh;font-weight:700;margin:1.21vh 0 1.21vh 0}
    .md-code, pre.md-code{background:#0f1724;color:#d6deff;padding:8px;border-radius:6px;font-family:monospace;white-space:pre-wrap;position:relative}
    .md-code:hover::after, pre.md-code:hover::after{content:"Copy";position:absolute;top:4px;right:4px;background:rgba(0,0,0,0.7);color:#fff;padding:2px 6px;border-radius:4px;font-size:11px;cursor:pointer}
    code.md-inline-code{background:rgba(0,0,0,0.45);padding:2px 6px;border-radius:4px;font-family:monospace}
    .md-highlight{background:linear-gradient(90deg,#fff59d,#fff176);padding:0 2px;border-radius:2px;animation:highlightPop .6s cubic-bezier(.2,.9,.25,1); color: rgba(0,0,0,0.85) !important;}
    @keyframes highlightPop{0%{transform:translateY(6px);opacity:0}100%{transform:none;opacity:1}}
    .word-span{display:inline-block;opacity:0;transform:translateY(6px)}
    .copied-toast{position:absolute;padding:6px 8px;background:rgba(0,0,0,0.85);color:#fff;border-radius:6px;font-size:12px;pointer-events:none;z-index:1000}
    table.md-table {border-collapse: collapse; width: 100%; margin: 10px 0;}
    table.md-table th, table.md-table td {border: 1px solid #ddd; padding: 8px;}
    table.md-table th {background-color: rgba(242, 242, 242, .175); backdrop-filter: blur(5px)}
    .math-inline { display: inline; }
    .math-block { display: block; text-align: center; margin: 10px 0; }
    .ai-output a { color: #4a8eff; text-decoration: underline; }
    .ai-output img { max-width: 100%; border-radius: 6px; margin: 8px 0; }
    .user-output img { max-width: 300px; border-radius: 8px; margin: 8px 0; border: 1px solid rgba(255,255,255,0.1); }
    .model-info-tooltip {
        position: absolute;
        background: rgba(0,0,0,0.85);
        color: white;
        padding: 6px 10px;
        border-radius: 4px;
        font-size: 12px;
        bottom: 100%;
        right: 0;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
    }
    .modely:hover .model-info-tooltip {
        opacity: 1;
    }
    `;
    const s = document.createElement("style");
    s.innerText = css;
    document.head.appendChild(s);
})();

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function(m) {
        return ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[m];
    });
}

function renderMarkdownToHtml(text) {
    if (!text) return "";
    let s = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const symbols = {
        '\\theta': 'θ', '\\alpha': 'α', '\\beta': 'β', '\\gamma': 'γ', '\\delta': 'δ', '\\epsilon': 'ε',
        '\\pi': 'π', '\\infty': '∞', '\\cdot': '·', '\\pm': '±', '\\sin': 'sin', '\\cos': 'cos', '\\tan': 'tan', '\\log': 'log', '\\sqrt': '√'
    };
    for (let sym in symbols) {
        const re = new RegExp(sym, 'g');
        s = s.replace(re, symbols[sym]);
    }
    function replaceFraction(match, numerator, denominator) {
        return `<span class="fraction"><span class="numerator">${numerator}</span><span class="denominator">${denominator}</span></span>`;
    }
    let fractionRegex = /\\frac\{([^{}]+)\}\{([^{}]+)\}/;
    while (fractionRegex.test(s)) {
        s = s.replace(fractionRegex, replaceFraction);
    }
    s = s.replace(/\\sqrt\{([^{}]+)\}/g, (m, content) => `<span class="sqrt">√<span class="sqrt-content">${content}</span></span>`);
    s = s.replace(/\\int_([^{}]+)\^([^{}]+)\s*([^dx]+)dx/g, (m, a, b, expr) => `<span class="integral">∫<sub>${a}</sub><sup>${b}</sup> ${expr} dx</span>`);
    s = s.replace(/\^(\{([^{}]+)\}|(\S))/g, (m, p1, p2, p3) => `<sup>${p2||p3}</sup>`);
    s = s.replace(/_(\{([^{}]+)\}|(\S))/g, (m, p1, p2, p3) => `<sub>${p2||p3}</sub>`);
    s = s.replace(/x\s*=\s*\\frac\{([^{}]+)\s*\\pm\s*\\sqrt\{([^{}]+)\}\}\{([^{}]+)\}/g, (m, top, sqrtContent, bottom) => {
        return `<span class="quadratic-formula">x = <span class="fraction"><span class="numerator">${top} ± <span class="sqrt">√<span class="sqrt-content">${sqrtContent}</span></span></span><span class="denominator">${bottom}</span></span></span>`;
    });
    s = s.replace(/\$\$(.*?)\$\$/gs, (m, p1) => `<div class="math-block">${p1}</div>`);
    s = s.replace(/\$(.*?)\$/g, (m, p1) => `<span class="math-inline">${p1}</span>`);
    s = s.replace(/\r\n/g, "\n");
    s = s.replace(/\n((?:\|.*\|(?:\n|$))+)/g, function(match, table) {
        const rows = table.trim().split('\n');
        let html = '<table class="md-table">';
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].split('|').filter(cell => cell.trim() !== '');
            const tag = i === 0 ? 'th' : 'td';
            html += '<tr>';
            for (let j = 0; j < cells.length; j++) html += `<${tag}>${cells[j].trim()}</${tag}>`;
            html += '</tr>';
        }
        html += '</table>';
        return html;
    });
    s = s.replace(/```([\s\S]*?)```/g, (m, p1) => {
        const codeContent = p1.replace(/^(\w+)\n/, '');
        const languageMatch = p1.match(/^(\w+)\n/);
        const language = languageMatch ? languageMatch[1] : '';
        return `<pre class="md-code" data-language="${language}">${codeContent}</pre>`;
    });
    s = s.replace(/`([^`]+)`/g, (m, p1) => `<code class="md-inline-code">${p1}</code>`);
    s = s.replace(/\*\*([^*]+)\*\*/g, (m, p1) => `<strong>${p1}</strong>`);
    s = s.replace(/\*([^*]+)\*/g, (m, p1) => `<em>${p1}</em>`);
    s = s.replace(/__([^_]+)__/g, (m, p1) => `<u>${p1}</u>`);
    s = s.replace(/==([^=]+)==/g, (m, p1) => `<mark class="md-highlight">${p1}</mark>`);
    s = s.replace(/^\s*#{2,}\s*(.+)$/gm, (m, p1) => `<div class="md-title">${p1}</div>`);
    s = s.replace(/^\s*#\s*(.+)$/gm, (m, p1) => `<div class="md-title">${p1}</div>`);
    s = s.replace(/\n{2,}/g, "<br><br>");
    return s;
}

function wrapTextNodesWithSpans(parent) {
    const walker = document.createTreeWalker(parent, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const tn of nodes) {
        if (!tn.nodeValue.trim()) continue;
        const frag = document.createDocumentFragment();
        const parts = tn.nodeValue.split(/(\s+)/);
        for (const p of parts) {
            if (p.match(/^\s+$/)) {
                frag.appendChild(document.createTextNode(p));
            } else {
                const sp = document.createElement("span");
                sp.className = "word-span";
                sp.textContent = p;
                frag.appendChild(sp);
            }
        }
        tn.parentNode.replaceChild(frag, tn);
    }
    Array.from(parent.children).forEach(c => {
        if (!c.classList.contains("word-span") && c.tagName !== 'IMG') wrapTextNodesWithSpans(c);
    });
}

function animateVisibleWords(parent, time) {
    const spans = parent.querySelectorAll(".word-span");
    const viewportHeight = window.innerHeight;
    let animatedCount = 0;
    const batchSize = 10;
    function animateBatch() {
        let count = 0;
        for (let i = animatedCount; i < spans.length && count < batchSize; i++) {
            const span = spans[i];
            const rect = span.getBoundingClientRect();
            if (rect.top < viewportHeight + 200) {
                span.style.transition = `opacity ${time}ms cubic-bezier(.2,.9,.25,1), transform ${time}ms cubic-bezier(.2,.9,.25,1)`;
                span.style.opacity = "1";
                span.style.transform = "translateY(0) scale(1)";
                animatedCount++;
                count++;
            } else {
                break;
            }
        }
        if (animatedCount < spans.length) {
            requestAnimationFrame(animateBatch);
        }
    }
    animateBatch();
    const scrollHandler = () => {
        animateBatch();
    };
    window.addEventListener('scroll', scrollHandler);
    setTimeout(() => {
        window.removeEventListener('scroll', scrollHandler);
    }, 10000);
}

function createCopiedToast(button, text = "Copied") {
    const toast = document.createElement("div");
    toast.className = "copied-toast";
    toast.textContent = text;
    if (button instanceof MouseEvent) {
        toast.style.position = "fixed";
        toast.style.left = `${button.clientX}px`;
        toast.style.top = `${button.clientY - 30}px`;
        document.body.appendChild(toast);
    } else {
        button.style.position = "relative";
        button.appendChild(toast);
    }
    requestAnimationFrame(() => {
        toast.style.transition = "opacity 220ms ease, transform 220ms cubic-bezier(.2,.9,.25,1)";
        toast.style.opacity = "1";
        toast.style.transform = "translateY(-18px)";
    });
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-8px)";
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 260);
    }, 900);
    if (typeof clickWelcome === "function") {
        try {
            clickWelcome();
        } catch (e) {}
    }
}

function createUserReplyDiv(userText, image1Base64, image2Base64) {
    userReplyCount++;
    const userId = userReplyCount;
    const div = document.createElement("div");
    div.className = "user-output";
    div.style.opacity = "0";
    
    let imagesHtml = '';
    if (image1Base64) {
        imagesHtml += `<img src="data:image/jpeg;base64,${image1Base64}" style="max-width:300px;border-radius:8px;margin:8px 0;border:1px solid rgba(255,255,255,0.1);">`;
    }
    if (image2Base64) {
        imagesHtml += `<img src="data:image/jpeg;base64,${image2Base64}" style="max-width:300px;border-radius:8px;margin:8px 0;border:1px solid rgba(255,255,255,0.1);">`;
    }
    
    div.innerHTML = `<div class="left-side user"></div><div class="middle-side user"><div class="top-output user"><h3 id="user-output-strand-${userId}">${escapeHtml(userText)}</h3>${imagesHtml}</div><div class="actions user"><div class="left-act user"><button class="output-actions-btn pen-btn" data-userid="${userId}"><i class="fa-solid fa-pen"></i></button><button class="output-actions-btn clone-user-btn" data-userid="${userId}"><i class="fa-solid fa-clone"></i></button></div></div></div><div class="right-side user"><div class="user-pfp"><img src="../../Assets/Test.png"></img></div></div>`;
    
    const container = document.querySelector(".chat-container");
    container.appendChild(div);
    requestAnimationFrame(() => {
        div.style.transition = "opacity 240ms ease";
        div.style.opacity = "1";
    });
    
    const penBtn = div.querySelector(".pen-btn");
    const cloneUserBtn = div.querySelector(".clone-user-btn");
    
    penBtn.addEventListener("click", () => {
        const currentText = document.querySelector(`#user-output-strand-${userId}`).textContent;
        const newText = prompt("Edit your message:", currentText);
        if (newText !== null && newText.trim() !== "") {
            document.querySelector(`#user-output-strand-${userId}`).textContent = newText;
            const userMessageIndex = conversationHistory.findIndex(msg => 
                msg.role === "user" && msg.content === currentText
            );
            if (userMessageIndex !== -1) {
                conversationHistory[userMessageIndex].content = newText;
            }
        }
    });
    
    cloneUserBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(userText).then(() => createCopiedToast(cloneUserBtn));
    });
    
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 100);
}

function createAIReplyDivPlaceholder() {
    aiReplyCount++;
    const aiId = aiReplyCount;
    const div = document.createElement("div");
    div.className = "ai-output";
    div.innerHTML = `
        <div class="left-side ai">
            <div class="ai-pfp" id="ai-pfp-${aiId}" style="opacity:0; transform:scale(0.74)">
                <img src="../../Assets/Prod1.png"></img>
            </div>
        </div>
        <div class="middle-side">
            <div class="top-output ai">
                <h3 id="ai-output-strand-${aiId}"></h3>
            </div>
            <div class="actions ai" id="ai-actions-${aiId}" style="opacity:0">
                <div class="left-act">
                    <button class="output-actions-btn clone-ai-btn" data-aiid="${aiId}">
                        <i class="fa-solid fa-clone"></i>
                    </button>
                    <button class="output-actions-btn redo-ai-btn" data-aiid="${aiId}">
                        <i class="fa-solid fa-arrows-rotate"></i>
                    </button>
                    <button class="output-actions-btn delete-ai-btn" data-aiid="${aiId}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
                <div class="right-act">
                    <button class="output-actions-btn speedy">
                        <h3 id="speed-dial-${aiId}">...</h3>
                    </button>
                    <button class="output-actions-btn modely">
                        <h3 id="model-dial-${aiId}">...</h3>
                        <div class="model-info-tooltip" id="model-info-${aiId}"></div>
                    </button>
                </div>
            </div>
        </div>
        <div class="right-side"></div>
    `;
    const container = document.querySelector(".chat-container");
    container.appendChild(div);
    
    const cloneBtn = div.querySelector(".clone-ai-btn");
    const redoBtn = div.querySelector(".redo-ai-btn");
    const deleteBtn = div.querySelector(".delete-ai-btn");
    
    cloneBtn.addEventListener("click", () => {
        const text = document.querySelector(`#ai-output-strand-${aiId}`).textContent || "";
        navigator.clipboard.writeText(text).then(() => createCopiedToast(cloneBtn));
    });
    
    redoBtn.addEventListener("click", async () => {
        const lastUser = conversationHistory.slice().reverse().find(m => m.role === "user");
        if (!lastUser) return;
        
        const strand = document.querySelector(`#ai-output-strand-${aiId}`);
        if (strand) strand.textContent = "";
        
        const aiResponseIndex = conversationHistory.findIndex(msg => 
            msg.role === "assistant" && msg.id === aiId
        );
        if (aiResponseIndex !== -1) {
            conversationHistory.splice(aiResponseIndex, 1);
        }
        
        await fetchAI(lastUser.content, aiId);
    });
    
    deleteBtn.addEventListener("click", () => {
        div.style.transition = "opacity 240ms ease";
        div.style.opacity = "0";
        setTimeout(() => {
            if (div.parentNode) div.parentNode.removeChild(div);
            const aiResponseIndex = conversationHistory.findIndex(msg => 
                msg.role === "assistant" && msg.id === aiId
            );
            if (aiResponseIndex !== -1) {
                conversationHistory.splice(aiResponseIndex, 1);
            }
        }, 240);
    });
    
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 100);
    
    return aiId;
}

async function fetchAIWithImage(prompt, imageBase64, aiId) {
    console.log("%c[fetchAIWithImage] called", "color:cyan;font-weight:700");
    const start = performance.now();
    currentModel = "meta-llama/llama-4-scout-17b-16e-instruct";
    
    const requestBody = { 
        model: currentModel, 
        messages: [
            ...conversationHistory.map(({id, ...rest}) => rest),
            {
                role: "user",
                content: [
                    { type: "text", text: prompt },
                    { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
                ]
            }
        ],
        temperature: 0.7,
        max_tokens: 2048
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) throw new Error(response.status);

        const data = await response.json();
        const aiReply = data?.choices?.[0]?.message?.content || "";

        conversationHistory.push({ 
            role: "assistant", 
            content: aiReply,
            id: aiId
        });

        const latency = Math.round(performance.now() - start);
        const speedEl = document.querySelector(`#speed-dial-${aiId}`);
        if (speedEl) speedEl.textContent = `${latency}ms`;

        const modelEl = document.querySelector(`#model-dial-${aiId}`);
        const modelName = AI_MODELS.find(m => m.model === currentModel)?.name || currentModel;
        if (modelEl) modelEl.textContent = modelName;

        console.log("%c[model]", "color:mediumseagreen;font-weight:700", data.model || currentModel);
        console.log("%c[latency]", "color:orange", latency + "ms");
        console.log("%c[AI reply]", "color:limegreen;font-weight:700", aiReply);

        const pfp = document.querySelector(`#ai-pfp-${aiId}`);
        if (pfp) {
            pfp.style.transition = "all 280ms cubic-bezier(.2,.9,.25,1)";
            pfp.style.opacity = "1";
            pfp.style.transform = "scale(1)";
        }

        const outputEl = document.querySelector(`#ai-output-strand-${aiId}`);
        if (!outputEl) return;

        const rendered = renderMarkdownToHtml(aiReply);
        outputEl.innerHTML = rendered;

        outputEl.querySelectorAll('.md-code').forEach(codeBlock => {
            codeBlock.addEventListener('click', (e) => {
                navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                    createCopiedToast(e, "Code copied!");
                });
            });
        });

        wrapTextNodesWithSpans(outputEl);
        if (aiReply.length > 242 && aiReply.length < 605) {
            animateVisibleWords(outputEl, 121);
        } else if (aiReply.length > 605 && aiReply.length < 960) {
            animateVisibleWords(outputEl, 12.1)
        } else if (aiReply.length > 960) {
            animateVisibleWords(outputEl, .121)
        } else {
            animateVisibleWords(outputEl, 242)
        }

        setTimeout(() => {
            const actions = document.querySelector(`#ai-actions-${aiId}`);
            if (actions) {
                actions.style.transition = "opacity 280ms ease";
                actions.style.opacity = "1";
            }
            const container = document.querySelector(".chat-container");
            container.scrollTop = container.scrollHeight;
        }, 500);

    } catch (err) {
        console.error("%c[Groq Error with Image]", "color:red;font-weight:700", err);
        await fetchAI(prompt, aiId, true);
    }
}

async function fetchAI(prompt, aiId) {
    console.log("%c[fetchAI] called", "color:cyan;font-weight:700");

    let startModelIndex = AI_MODELS.findIndex(m => m.model === currentModel);
    if (startModelIndex === -1) startModelIndex = 0;

    for (let i = 0; i < AI_MODELS.length; i++) {
        const modelIndex = (startModelIndex + i) % AI_MODELS.length;
        currentModel = AI_MODELS[modelIndex].model;
        const start = performance.now();

        const requestBody = { 
            model: currentModel, 
            messages: conversationHistory.map(({id, ...rest}) => rest),
            temperature: 0.7,
            max_tokens: 2048
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) throw new Error(response.status);

            const data = await response.json();
            const aiReply = data?.choices?.[0]?.message?.content || "";

            conversationHistory.push({ 
                role: "assistant", 
                content: aiReply,
                id: aiId
            });

            const latency = Math.round(performance.now() - start);
            const speedEl = document.querySelector(`#speed-dial-${aiId}`);
            if (speedEl) speedEl.textContent = `${latency}ms`;

            const modelEl = document.querySelector(`#model-dial-${aiId}`);
            const modelName = AI_MODELS.find(m => m.model === currentModel)?.name || currentModel;
            if (modelEl) modelEl.textContent = modelName;

            console.log("%c[model]", "color:mediumseagreen;font-weight:700", data.model || currentModel);
            console.log("%c[latency]", "color:orange", latency + "ms");
            console.log("%c[AI reply]", "color:limegreen;font-weight:700", aiReply);

            const pfp = document.querySelector(`#ai-pfp-${aiId}`);
            if (pfp) {
                pfp.style.transition = "all 280ms cubic-bezier(.2,.9,.25,1)";
                pfp.style.opacity = "1";
                pfp.style.transform = "scale(1)";
            }

            const outputEl = document.querySelector(`#ai-output-strand-${aiId}`);
            if (!outputEl) return;

            const rendered = renderMarkdownToHtml(aiReply);
            outputEl.innerHTML = rendered;

            outputEl.querySelectorAll('.md-code').forEach(codeBlock => {
                codeBlock.addEventListener('click', (e) => {
                    navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                        createCopiedToast(e, "Code copied!");
                    });
                });
            });

            wrapTextNodesWithSpans(outputEl);
            if (aiReply.length > 242 && aiReply.length < 605) {
                animateVisibleWords(outputEl, 121);
            } else if (aiReply.length > 605 && aiReply.length < 960) {
                animateVisibleWords(outputEl, 12.1)
            } else if (aiReply.length > 960) {
                animateVisibleWords(outputEl, .121)
            } else {
                animateVisibleWords(outputEl, 242)
            }

            setTimeout(() => {
                const actions = document.querySelector(`#ai-actions-${aiId}`);
                if (actions) {
                    actions.style.transition = "opacity 280ms ease";
                    actions.style.opacity = "1";
                }
                const container = document.querySelector(".chat-container");
                container.scrollTop = container.scrollHeight;
            }, 500);

            return; 
        } catch (err) {
            console.error("%c[Groq Error]", "color:red;font-weight:700", err, "model:", currentModel);
        }
    }

    console.error("%c[Groq Error]", "color:red;font-weight:700", "All models failed.");
}

async function generateChatName(prompt) {
    console.log("%c[generateChatName] called", "color:cyan;font-weight:700");
    const start = performance.now();
    const historyText = conversationHistory.map(m => `${m.role}: ${m.content}`).join("\n");
    const requestBody = {
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
            {
                role: "user",
                content: `Based on the following chat history and the new user prompt, generate a descriptive chat name. 
The name must:
- Be in third person (like it's auto-generated by the system).
- Be fluent, legible, professional, 4-15 words, max 90 characters.
- Summarize what the chat is about.
- if the user requests a title, then change it to that, as long as it is less than 90 chars
- Respond with only the title and nothing else.
- Make sure that your response summarizes the chat very well. 
- if the user prompt and chat histoy is ONLY greetings, then return blank
- Make sure it keeps ALL info the user has sent. Simple, straightforward and outlooking. Also try not to reuse chat titles. so be unique for that. dont copy my information request that is lame. be unique but cool.

Chat history:
${historyText}

User prompt: "${prompt}"`
            }
        ],
        temperature: 0.5,
        max_tokens: 60
    };
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        let aiReply = data?.choices?.[0]?.message?.content?.trim() || "";
        if (aiReply) {
            aiReply = aiReply.replace(/^["']|["']$/g, '');
            aiReply = aiReply.replace(/^(title|chat name|suggestion):\s*/i, '');
        }
        let chatName = aiReply.length > 0 ? aiReply : "";
        if (chatName.length > 90) {
            chatName = chatName.substring(0, 87) + "...";
        }
        const latency = Math.round(performance.now() - start);
        console.log("%c[chat name latency]", "color:orange", latency + "ms");
        const chatNameInput = document.querySelector('input[name="chat-name"], #chat-name-input');
        if (chatNameInput) chatNameInput.value = chatName;
        if (typeof setInputValue === "function") {
            setInputValue(chatName);
        }
        console.log("%c[Generated Chat Name]", "color:mediumseagreen;font-weight:700", chatName);
        return chatName;
    } catch (err) {
        console.error("%c[Groq Error in generateChatName]", "color:red;font-weight:700", err);
        return "AI Chat";
    }
}

async function checkIfGreeting(prompt) {
    console.log("%c[checkIfGreeting] called", "color:cyan;font-weight:700");
    const historyText = conversationHistory.map(m => `${m.role}: ${m.content}`).join("\n");
    const requestBody = {
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
            {
                role: "user",
                content: `Look at this conversation history and the latest user prompt. 
Decide if the new prompt is just a greeting (like hi, hello, hey, good morning,sup, whats up etc.) Anything that tries to be like a greeting. If the message containsa greeting then a prompt, return no. 
Respond strictly with "yes" or "no".

Chat history:
${historyText}

User prompt: "${prompt}"`
            }
        ],
        temperature: 0,
        max_tokens: 5
    };
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        let aiReply = data?.choices?.[0]?.message?.content?.trim().toLowerCase() || "no";
        if (aiReply === "no") {
            return await generateChatName(prompt);
        } else {
            console.log("%c[Greeting Detected]", "color:yellow;font-weight:700", prompt);
            return "Greeting";
        }
    } catch (err) {
        console.error("%c[Groq Error in checkIfGreeting]", "color:red;font-weight:700", err);
        return await generateChatName(prompt);
    }
}

function setInputValue(value) {
    const chatNameInput = document.querySelector('input[name="chat-name"], #chat-name-input');
    if (chatNameInput) {
        chatNameInput.value = value;
    }
}

function getImageFromAttachment(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    
    if (el.style.backgroundImage && el.style.backgroundImage !== 'none') {
        const url = el.style.backgroundImage.replace(/url\(["']?(.*?)["']?\)/, "$1");
        if (url.startsWith('data:image')) {
            return url.split(',')[1];
        }
    }
    return null;
}

function clearAttachment(id) {
    const el = document.getElementById(id);
    if (el) {
        el.style.backgroundImage = 'none';
        el.innerHTML = id === 'attach-doc-1' ? '<i class="fa-solid fa-plus"></i>' : '<i class="fa-solid fa-plus"></i>';
        el.classList.remove("force-hover");
    }
}

async function sendPrompt() {
    const inputEl = document.getElementById("chat-input-system");
    const inputValue = (inputEl && inputEl.value || "").trim();
    if (inputEl) inputEl.value = "";
    if (!inputValue) return;
    
    const image1Base64 = getImageFromAttachment("attach-doc-1");
    const image2Base64 = getImageFromAttachment("attach-doc-2");
    
    createUserReplyDiv(inputValue, image1Base64, image2Base64);
    conversationHistory.push({ role: "user", content: inputValue });
    
    checkIfGreeting(inputValue);
    
    const aiId = createAIReplyDivPlaceholder();
    
    if (image1Base64 || image2Base64) {
        const imageBase64 = image1Base64 || image2Base64;
        await fetchAIWithImage(inputValue, imageBase64, aiId);
        clearAttachment("attach-doc-1");
        clearAttachment("attach-doc-2");
    } else {
        await fetchAI(inputValue, aiId);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input-system');
    if (chatInput) {
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const welcomeScreen = document.querySelector(".welcome-chat-container");
                if (welcomeScreen && welcomeScreen.style.opacity == "0") {
                    sendPrompt();
                } else if (welcomeScreen) {
                    welcomeScreen.style.transform = "translateY(-100vh)";
                    welcomeScreen.style.scale = "0.69";
                    welcomeScreen.style.filter = "brightness(0)";
                    welcomeScreen.style.opacity = "0";
                    sendPrompt();
                } else {
                    sendPrompt();
                }
            }
        });
    }
    
    const sendButton = document.querySelector('.send-button, #send-button');
    if (sendButton) {
        sendButton.addEventListener('click', sendPrompt);
    }
    
    const mainButton = document.querySelector(".inner-content");
    if (mainButton) {
        mainButton.addEventListener("click", () => {
            const currentText = mainButton.querySelector(".text").innerText;
            let currentIndex = AI_MODELS.findIndex(m => currentText.includes(m.name));
            currentIndex = (currentIndex + 1) % AI_MODELS.length;
            const nextModel = AI_MODELS[currentIndex];
            mainButton.innerHTML = `<div class="icon" style="margin-right:1.15vh"><i class="fa-solid ${nextModel.icon}"></i></div><div class="text">${nextModel.name}</div>`;
            currentModel = nextModel.model;
            console.log("Switched to AI model:", currentModel);
        });
    }
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                const container = document.querySelector(".chat-container");
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
            }
        });
    });
    
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
        observer.observe(chatContainer, { childList: true, subtree: true });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    function imgChoose(id) {
        
        const el = document.getElementById(id)
        if (el.tagName === "INPUT" && el.type === "file") {
            el.addEventListener("change", () => {
                const f = el.files[0]
                if (f && f.type.startsWith("image/")) {
                    const r = new FileReader()
                    r.onload = e => {
                        el.style.backgroundImage = `url('${e.target.result}')`
                        el.style.backgroundSize = "cover"
                        el.style.backgroundPosition = "center"
                        el.value = ""
                    }
                    r.readAsDataURL(f)
                }
            })
            el.addEventListener("dragover", e => e.preventDefault())
            el.addEventListener("drop", e => {
                e.preventDefault()
                const f = e.dataTransfer.files[0]
                if (f && f.type.startsWith("image/")) {
                    const r = new FileReader()
                    r.onload = ev => {
                        el.style.backgroundImage = `url('${ev.target.result}')`
                        el.style.backgroundSize = "cover"
                        el.style.backgroundPosition = "center"
                        el.value = ""
                    }
                    r.readAsDataURL(f)
                }
            })
        }
        if (el.tagName === "DIV") {
            const hidden = document.createElement("input")
            hidden.type = "file"
            hidden.accept = "image/*"
            hidden.style.display = "none"
            document.body.appendChild(hidden)
            el.addEventListener("click", () => hidden.click())
            hidden.addEventListener("change", () => {
                const f = hidden.files[0]
                if (f && f.type.startsWith("image/")) {
                    const r = new FileReader()
                    r.onload = e => {
                        el.style.backgroundImage = `url('${e.target.result}')`
                        el.style.backgroundSize = "cover"
                        el.style.backgroundPosition = "center"
                        el.innerHTML = ""
                        el.classList.add("force-hover")
                    }
                    r.readAsDataURL(f)
                }
            })
            el.addEventListener("dragover", e => e.preventDefault())
            el.addEventListener("drop", e => {
                e.preventDefault()
                const f = e.dataTransfer.files[0]
                if (f && f.type.startsWith("image/")) {
                    const r = new FileReader()
                    r.onload = ev => {
                        el.style.backgroundImage = `url('${ev.target.result}')`
                        el.style.backgroundSize = "cover"
                        el.style.backgroundPosition = "center"
                        el.innerHTML = ""
                        el.classList.add("force-hover")
                    }
                    r.readAsDataURL(f)
                }
            })
            el.addEventListener("mouseenter", () => el.classList.remove("force-hover"))
        }
    }
    imgChoose("attach-doc-1")
    imgChoose("attach-doc-2")
})