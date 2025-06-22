describe('TODOMvc App', () => {
  it('Verifica se app estÃ¡ abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });
  });

describe('TODOMvc App - Testes Complementares', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('Edita uma tarefa existente', () => {
    cy.get('[data-cy=todo-input]').type('Tarefa original{enter}');

    cy.get('[data-cy=todos-list] li')
      .first()
      .dblclick();

    cy.get('li.editing .edit')
      .clear()
      .type('Tarefa editada com sucesso{enter}');

    cy.get('[data-cy=todos-list] li')
      .should('have.length', 1)
      .and('contain.text', 'Tarefa editada com sucesso');

    cy.get('li.editing').should('not.exist');
  });

  it('Marca e desmarca uma tarefa como concluída', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Revisar código{enter}');

    cy.get('[data-cy=toggle-todo-checkbox]')
      .check()
      .should('be.checked');

    cy.get('[data-cy=toggle-todo-checkbox]')
      .uncheck()
      .should('not.be.checked');
  });

  it('Limpa as tarefas que foram completadas', () => {
    cy.get('[data-cy=todo-input]').type('Tarefa 1 - Fazer{enter}');
    cy.get('[data-cy=todo-input]').type('Tarefa 2 - Remover{enter}');
    cy.get('[data-cy=todo-input]').type('Tarefa 3 - Remover{enter}');

    cy.get('[data-cy=todos-list] li')
      .eq(1)
      .find('.toggle')
      .click();

    cy.get('[data-cy=todos-list] li')
      .eq(2)
      .find('.toggle')
      .click();

    cy.get('.clear-completed').should('be.visible').click();

    cy.get('[data-cy=todos-list] li').should('have.length', 1);

    cy.get('[data-cy=todos-list] li')
      .first()
      .should('have.text', 'Tarefa 1 - Fazer');

    cy.get('.clear-completed').should('not.be.visible');
  });
});