class ProjectInput {
  templateElement: HTMLTemplateElement;
  // HTMLTemplateElement는 템플릿 태그의 타입이다.
  hostElement: HTMLDivElement;
  // HTMLDivElement는 div 태그의 타입이다.
  element: HTMLFormElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    const importedNode = document.importNode(this.templateElement.content, true);
    // content는 HTMLTemplateElement의 속성으로, 템플릿의 콘텐츠에 대한 참조를 제공해준다.
    // importNode의 두 번째 매개변수는 깊은 복사 여부를 나타내는 boolean 값이다.
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
