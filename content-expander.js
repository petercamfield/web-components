const template = `<template>
    <div class='expander collapsed'>
        <div class='title'>title</div>
        <div class='content'>
            <slot>No content supplied</slot>
        </div>
    </div>
</template>`;

class ContentExpander extends HTMLElement {
    constructor() {
        super();

        const expander = createElement(template).content.cloneNode(true);
        const css = createElement('<link rel="stylesheet" href="content-expander.css">');

        this.expanded = false;
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.append(expander, css);
    }

    toggle() {
        const className = { true: 'expanded', false: 'collapsed' };
        const expander = this.shadow.querySelector('.expander');
        expander.classList.replace(className[this.expanded], className[!this.expanded]);
        this.expanded = !this.expanded;
    }

    connectedCallback() {
        const title = this.shadow.querySelector('.title');
        title.innerHTML = this.getAttribute('title');
        title.addEventListener('click', () => this.toggle());
    }
}

customElements.define('content-expander', ContentExpander);

function createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
}
