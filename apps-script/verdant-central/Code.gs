/**
 * VERDANT | CRIAÇÃO AUTOMÁTICA DOS FORMULÁRIOS
 *
 * Como usar:
 * 1) Acesse https://script.google.com/home/start e crie um projeto.
 * 2) Em Serviços (+), adicione Google Docs API (identificador: Docs), usada no PDF em duas colunas.
 * 3) Apague o conteúdo inicial, cole este arquivo e salve.
 * 4) Selecione criarFormulariosVerdant e clique em Executar.
 * 5) Autorize uma vez. A execução cria a pasta, a planilha e os formulários.
 *
 * As execuções seguintes reutilizam os arquivos registrados e não duplicam
 * os formulários. A publicação fica sob controle manual; a agenda automatiza
 * somente a abertura e o fechamento do recebimento de respostas.
 */

const CONFIG = {
  PASTA: 'Verdant - Central de Listas e Leads',
  PLANILHA: 'Verdant - Central de Listas e Leads',
  // A publicação é controlada manualmente; a agenda altera só o recebimento de respostas.
  FUSO_HORARIO: 'America/Sao_Paulo',
  COR_VERDE: '#64C082',
  COR_AZUL: '#568CC9',
  COR_ROSA: '#ECB7D4',
  COR_AMARELO: '#FEE933',
  COR_ROXO: '#AF83BB',
  COR_TEXTO: '#24352E'
};

const ACEITE_NOVIDADES = 'Quero receber novidades, eventos e ofertas da Verdant pelo WhatsApp e/ou e-mail. Sei que posso cancelar o recebimento quando quiser.';
const CONFIRMACAO = 'Recebemos sua resposta. Confira as regras e os horários da lista e apresente um documento oficial com foto quando solicitado.';

const FORMULARIOS = [
  {
    key: 'dj_sexta',
    legacy: true,
    responseSheet: 'Lista DJs Sexta',
    title: 'Lista DJs Verdant | Sexta-feira',
    description: 'Não perca a chance de garantir sua presença em uma noite incrível com a gente!\n\nComo funciona:\n• Valor da lista: R$ 30,00, revertidos em consumação, das 00h às 03h.\n• Um nome por resposta.\n• Nomes aceitos até às 19h.\n\nNão esqueça seu RG e chegue dentro do horário da lista.',
    questions: [
      { type: 'choice', title: 'Marque o nome do DJ', required: true, choices: ['Anderson Zabroski', 'Andre Gazza', 'Wagner Maurício', 'John Wilber', 'Hevan', 'Heuricx', 'Matt Lovi', 'Diego San Fierro', 'Thiarty'] }
    ]
  },
  {
    key: 'influencer_sexta',
    legacy: true,
    responseSheet: 'Lista Influencers Sexta',
    title: 'Lista Influencers Verdant | Sexta-feira',
    description: 'Não perca a chance de garantir sua presença em uma noite incrível com a gente!\n\nComo funciona:\n• Valor da lista: R$ 30,00, revertidos em consumação, das 00h às 03h.\n• Um nome por resposta.\n• Nomes aceitos até às 19h.\n\nNão esqueça seu RG e chegue dentro do horário da lista.',
    questions: [
      { type: 'choice', title: 'Selecione o nome do influenciador', required: true, choices: ['Alee Ribas', 'Ana Paula', 'Elias Forteski', 'Eduardo Lima', 'Elison Garcia', 'Mônica Ortiz', 'Well Brunini'] }
    ]
  },
  {
    key: 'lista_amiga_sabado',
    responseSheet: 'Lista Lovers Sábado',
    title: 'Lista Lovers | Sábado',
    description: 'Não perca a chance de garantir sua presença em uma noite incrível com a gente!\n\nComo funciona:\n• Valor da lista: R$ 70,00, revertidos em consumação, das 23h às 01h.\n• Um nome por resposta.\n• Nomes aceitos até às 19h.\n\nNão esqueça seu RG e chegue dentro do horário da lista.',
    questions: []
  },
  {
    key: 'canal_lover_sabado',
    responseSheet: 'Canal Lover Sábado',
    title: 'Lista Canal Lover | Sábado',
    description: 'Não perca a chance de garantir sua presença em uma noite incrível com a gente!\n\nComo funciona:\n• Valor da lista: R$ 70,00, revertidos em consumação, das 23h às 01h.\n• Um nome por resposta.\n• Nomes aceitos até às 19h.\n\nNão esqueça seu RG e chegue dentro do horário da lista.',
    questions: []
  },
  {
    key: 'dj_sabado',
    legacy: true,
    responseSheet: 'Lista DJs Sábado',
    title: 'Lista DJs Verdant | Sábado',
    description: 'Não perca a chance de garantir sua presença em uma noite incrível com a gente!\n\nComo funciona:\n• Valor da lista: R$ 60,00, revertidos em consumação, das 23h às 01h.\n• Um nome por resposta.\n• Nomes aceitos até às 19h.\n\nNão esqueça seu RG e não perca o horário da lista.',
    questions: [
      { type: 'choice', title: 'Marque o nome do DJ', required: true, choices: ['Anderson Zabroski', 'Wagner Mauricio', 'Andre Gazza', 'Allan Natal', 'Má Rodrigues', 'Lucas Franco', 'Ramon', 'Mau Perin', 'Duda Mehel', 'Dubiong', 'Fredo Silva'] }
    ]
  },
  {
    key: 'influencer_sabado',
    legacy: true,
    responseSheet: 'Lista Influencers Sábado',
    title: 'Lista Influencers Verdant | Sábado',
    description: 'Não perca a chance de garantir sua presença em uma noite incrível com a gente!\n\nComo funciona:\n• Valor da lista: R$ 60,00, revertidos em consumação, das 23h às 01h.\n• Um nome por resposta.\n• Nomes aceitos até às 19h.\n\nNão esqueça seu RG e não perca o horário da lista.',
    questions: [
      { type: 'choice', title: 'Selecione o nome do influenciador', required: true, choices: ['Alee Ribas', 'Ana Paula', 'Elias Forteski', 'Elison Garcia', 'Eduardo Lima', 'Mônica Ortiz', 'Well Brunini'] }
    ]
  },
  {
    key: 'dj_unificado',
    responseSheet: 'Lista DJs Unificada',
    title: 'Lista DJs Verdant | Sexta ou Sábado',
    description: 'Inscrições abrem na terça-feira às 20h. Selecione o evento disponível na agenda; a opção exibe data, horário e valor da lista. Cada dia encerra às 19h da própria data do evento. Quando a sexta encerra, a opção de sábado permanece aberta até sábado às 19h.',
    kind: 'unified',
    role: 'DJ',
    summary: false,
    questions: []
  },
  {
    key: 'influencer_unificado',
    responseSheet: 'Lista Influencers Unificada',
    title: 'Lista Influenciadores Verdant | Sexta ou Sábado',
    description: 'Inscrições abrem na terça-feira às 20h. Selecione o evento disponível na agenda; a opção exibe data, horário e valor da lista. Cada dia encerra às 19h da própria data do evento. Quando a sexta encerra, a opção de sábado permanece aberta até sábado às 19h.',
    kind: 'unified',
    role: 'INFLUENCER',
    summary: false,
    questions: []
  },
  {
    key: 'aniversario_sexta_sabado',
    responseSheet: 'Aniversário',
    title: 'Lista de Aniversário Verdant | Sexta-feira ou Sábado',
    description: 'Celebre seu aniversário em grande estilo na Verdant!\n\nEntrada VIP gratuita para o aniversariante, sem filas e com acesso exclusivo. A área VIP na pista SKY depende de estar aberta e da capacidade máxima do local; não é válida em festas especiais. Você pode trazer um bolo e entregá-lo a um segurança para guardar na geladeira.\n\nLISTA DE SEXTA: até 15 convidados, que pagam o valor de portaria. Com 10 convidados confirmados, o aniversariante ganha um combo B-Day. Lista de sexta válida até às 01h.\n\nLISTA DE SÁBADO: até 10 convidados; cada convidado paga R$ 50,00, revertidos em consumação. Lista válida das 23h às 01h.\n\nEnvie a lista até às 13h do dia do evento. Válida para aniversariantes da semana (segunda a domingo) em festas de sexta e sábado. Às quintas e aos domingos não há lista; o aniversariante do dia ganha entrada VIP gratuita. A lista não pode ser alterada após o envio. Solicitações fora desses critérios não são válidas.',
    questions: [
      { type: 'date', title: 'Data de nascimento', required: true },
      { type: 'checkbox', title: 'Escolha um único dia para comemorar: sexta-feira ou sábado. Não é possível selecionar os dois.', required: true, choices: ['Sexta-feira', 'Sábado'] },
      { type: 'paragraph', title: 'Informe os nomes completos dos convidados. Na sexta, podem ser indicados até 15 convidados, que pagam o valor de portaria. Com 10 confirmados, o aniversariante ganha um combo B-Day. No sábado, podem ser indicados até 10 convidados, cada um com R$ 50,00 revertidos em consumação. Não precisa numerar os convidados.', required: true },
      { type: 'choice', title: 'Você vai levar um bolo? Entregue-o a um dos seguranças para guardar na geladeira.', required: true, choices: ['Sim', 'Não'] }
    ]
  },
  {
    key: 'pessoas_trans_drag',
    responseSheet: 'Lista VIP',
    title: 'Lista VIP | Sexta, Sábado e Domingo',
    description: 'Pessoas trans e artistas Drag têm entrada gratuita (VIP) nas festas realizadas às sextas, sábados e domingos.\n\nA liberação da entrada VIP acontece após o horário de Open Bar. Para validar a inclusão na lista, apresente-se à equipe responsável após o encerramento do período de Open Bar.\n\nPara artistas Drag, é necessário estar montada e produzida no momento da entrada.\n\nPreencha o formulário corretamente para solicitar sua inclusão na lista.',
    questions: []
  }
];

function criarFormulariosVerdant() {
  const props = PropertiesService.getScriptProperties();
  const folder = getOrCreateFolder_(props);
  const spreadsheet = getOrCreateSpreadsheet_(props, folder);
  spreadsheet.setSpreadsheetLocale('pt_BR');
  spreadsheet.setSpreadsheetTimeZone('America/Sao_Paulo');
  inicializarCentral_(spreadsheet);
  const rows = [['Lista', 'Link para editar', 'Link para responder', 'Aba de respostas', 'Status']];

  FORMULARIOS.forEach(function (spec) {
    if (spec.legacy) {
      const legacyForm = getExistingForm_(props, spec.key);
      if (legacyForm) {
        prepararFormularioExistente_(legacyForm, spec);
        legacyForm.setTitle(spec.title);
        legacyForm.setDescription(spec.description);
      }
      return;
    }
    let form = getExistingForm_(props, spec.key);
    if (!form) {
      form = FormApp.create(spec.title, false);
      props.setProperty('form_' + spec.key, form.getId());
      DriveApp.getFileById(form.getId()).moveTo(folder);
    }
    prepararFormularioExistente_(form, spec);
    if (!formularioCompleto_(form, spec)) {
      limparItensFormulario_(form);
      montarFormulario_(form, spec, spreadsheet);
    }
    // Atualiza o texto dos formulários existentes sem apagar respostas ou recriar perguntas.
    form.setTitle(spec.title);
    form.setDescription(spec.description);
    const responseSheet = conectarAbaRespostas_(form, spec, spreadsheet, props);
    instalarGatilhoFormulario_(form);
    rows.push([spec.title, form.getEditUrl(), form.getPublishedUrl(), responseSheet ? responseSheet.getName() : spec.responseSheet, form.isPublished() ? 'Publicado • agenda automática' : 'Rascunho']);
  });

  const index = spreadsheet.getSheetByName('Formulários');
  index.clearContents();
  index.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  estilizarCabecalho_(index, 1, rows[0].length);
  index.autoResizeColumns(1, rows[0].length);
  estilizarAbaFormularios_(index);
  instalarGatilhoOpcoes_(spreadsheet);
  instalarGatilhoMenuCentralVerdant_(spreadsheet);
  sincronizarOpcoesFormulariosVerdant();
  reconstruirListaUnicaVerdant_(spreadsheet);
  atualizarResumoVerdant_();
  instalarGatilhoJanelaFormulariosVerdant_();
  atualizarJanelaFormulariosVerdant_();
  Logger.log('Pasta: ' + folder.getUrl());
  Logger.log('Central de listas e leads: ' + spreadsheet.getUrl());
}

function montarFormulario_(form, spec, spreadsheet) {
  if (spec.kind === 'unified') return montarFormularioUnificado_(form, spec, spreadsheet);
  form.setCollectEmail(true);
  form.setDescription(spec.description);
  form.setConfirmationMessage(CONFIRMACAO);
  form.setShowLinkToRespondAgain(false);

  addRequiredText_(form, 'Nome completo, conforme consta no documento');
  addRequiredText_(form, 'Telefone/WhatsApp com DDD');

  spec.questions.forEach(function (q) {
    if (q.type === 'choice') {
      const group = grupoOpcao_(spec.key);
      const choices = group ? getOpcoesAtivas_(spreadsheet, group) : deduplicarOpcoes_(q.choices);
      if (!choices.length) throw new Error('Ative ao menos uma opção do grupo ' + group + ' na aba Configurações antes de criar o formulário ' + spec.title + '.');
      form.addMultipleChoiceItem().setTitle(q.title).setChoiceValues(choices).setRequired(q.required);
    } else if (q.type === 'checkbox') {
      const checkbox = form.addCheckboxItem().setTitle(q.title).setChoiceValues(q.choices).setRequired(q.required);
      if (spec.key === 'aniversario_sexta_sabado' && /dia da semana/i.test(q.title)) {
        checkbox.setValidation(FormApp.createCheckboxValidation()
          .setHelpText('Selecione somente sexta-feira ou sábado. Não marque os dois dias.')
          .requireSelectAtMost(1)
          .build());
      }
    } else if (q.type === 'date') {
      form.addDateItem().setTitle(q.title).setRequired(q.required);
    } else if (q.type === 'paragraph') {
      form.addParagraphTextItem().setTitle(q.title).setRequired(q.required);
    }
  });

  form.addCheckboxItem()
    .setTitle(ACEITE_NOVIDADES)
    .setChoiceValues(['Sim, aceito receber novidades.'])
    .setRequired(false);
}

function montarFormularioUnificado_(form, spec, ss) {
  form.setCollectEmail(true);
  form.setDescription(spec.description);
  form.setConfirmationMessage(CONFIRMACAO);
  form.setShowLinkToRespondAgain(false);
  addRequiredText_(form, 'Nome completo, conforme consta no documento');
  addRequiredText_(form, 'Telefone/WhatsApp com DDD');

  const eventItem = form.addMultipleChoiceItem().setTitle('Selecione o evento').setRequired(true);
  const fridaySection = form.addPageBreakItem().setTitle('Lista de sexta-feira').setHelpText('Sexta: R$ 30,00 em consumação, das 00h às 03h.');
  const fridayTitle = spec.role === 'DJ' ? 'Selecione o DJ de sexta' : 'Selecione o influenciador de sexta';
  const fridayChoices = getOpcoesAtivas_(ss, spec.role === 'DJ' ? 'DJ_SEXTA' : 'INFLUENCER');
  form.addMultipleChoiceItem().setTitle(fridayTitle).setChoiceValues(fridayChoices.length ? fridayChoices : ['Nenhuma opção ativa']).setRequired(true);

  const saturdaySection = form.addPageBreakItem().setTitle('Lista de sábado').setHelpText('Sábado: R$ 60,00 em consumação, das 23h à 01h.');
  const saturdayTitle = spec.role === 'DJ' ? 'Selecione o DJ de sábado' : 'Selecione o influenciador de sábado';
  const saturdayChoices = getOpcoesAtivas_(ss, spec.role === 'DJ' ? 'DJ_SABADO' : 'INFLUENCER');
  form.addMultipleChoiceItem().setTitle(saturdayTitle).setChoiceValues(saturdayChoices.length ? saturdayChoices : ['Nenhuma opção ativa']).setRequired(true);

  const confirmationSection = form.addPageBreakItem().setTitle('Confirmação');
  fridaySection.setGoToPage(confirmationSection);
  const eventOptions = eventosDisponiveisLista_(ss, spec);
  if (eventOptions.length) {
    eventItem.setChoices(eventOptions.map(function (event) {
      return eventItem.createChoice(rotuloEventoLista_(event), event.day === 5 ? fridaySection : saturdaySection);
    }));
  } else {
    eventItem.setChoiceValues(['Nenhum evento disponível na agenda']);
  }
  form.addCheckboxItem().setTitle(ACEITE_NOVIDADES).setChoiceValues(['Sim, aceito receber novidades.']).setHelpText('Opcional. Sua escolha não altera sua inscrição na lista.').setRequired(false);
}

function inicializarAgendaEventosVerdant_(ss) {
  const sheet = getOrCreateSheet_(ss, 'Agenda de Eventos');
  sheet.getRange('A1:C1').setValues([['Dia do evento', 'Data do evento', 'Nome do evento (opcional)']]);
  sheet.getRange('A2:A3').setValues([['Sexta-feira'], ['Sábado']]);
  if (sheet.getRange('B2:B3').isBlank()) sheet.getRange('B2:B3').clearContent();
  sheet.getRange('A5:C5').merge().setValue('Cadastre a data de cada evento. A inscrição abre na terça-feira anterior às 20h e fecha às 19h da data correspondente. Sexta encerra na sexta; sábado continua aberto até sábado às 19h.');
  sheet.getRange('A1:C1').setFontWeight('bold').setBackground('#164734').setFontColor('#FFFFFF');
  sheet.getRange('B2:B3').setNumberFormat('dd/mm/yyyy').setDataValidation(SpreadsheetApp.newDataValidation().requireDate().build()).setBackground('#FFF9CC');
  sheet.getRange('A5:C5').setWrap(true).setBackground('#F2F7F3');
  sheet.setFrozenRows(1); sheet.setColumnWidth(1,150); sheet.setColumnWidth(2,150); sheet.setColumnWidth(3,260); sheet.setRowHeight(5,48); sheet.setTabColor(CONFIG.COR_AMARELO);
}

function dataEventoAgenda_(ss, day) {
  const sheet = ss.getSheetByName('Agenda de Eventos');
  if (!sheet || sheet.getLastRow() < 2) return null;
  const rows = sheet.getRange(2,1,Math.max(2,sheet.getLastRow()-1),3).getValues();
  const label = day === 5 ? 'Sexta-feira' : 'Sábado';
  const row = rows.filter(function(r){return String(r[0]) === label && r[1] instanceof Date;})[0];
  if (!row) return null;
  const date = row[1];
  const dateText = Utilities.formatDate(date, CONFIG.FUSO_HORARIO, 'yyyy-MM-dd');
  const weekday = Number(Utilities.formatDate(date, CONFIG.FUSO_HORARIO, 'u'));
  if ((day === 5 && weekday !== 5) || (day === 6 && weekday !== 6)) return null;
  return {day:day,label:label,date:new Date(dateText + 'T12:00:00-03:00'),eventName:String(row[2]||'').trim()};
}

/** Cada data tem janela própria: terça anterior às 20h até às 19h do próprio evento. */
function janelaDataEventoAberta_(event) {
  if (!event) return false;
  const nowText = Utilities.formatDate(new Date(), CONFIG.FUSO_HORARIO, 'yyyy-MM-dd HH:mm');
  const now = new Date(nowText.replace(' ', 'T') + ':00-03:00');
  const eventText = Utilities.formatDate(event.date, CONFIG.FUSO_HORARIO, 'yyyy-MM-dd');
  const eventWeekday = event.day;
  const daysBackToTuesday = eventWeekday === 5 ? 3 : 4;
  const eventDate = new Date(eventText + 'T12:00:00-03:00');
  const tuesday = new Date(eventDate.getTime() - daysBackToTuesday * 86400000);
  const tuesdayText = Utilities.formatDate(tuesday, CONFIG.FUSO_HORARIO, 'yyyy-MM-dd');
  const opens = new Date(tuesdayText + 'T20:00:00-03:00');
  const closes = new Date(eventText + 'T19:00:00-03:00');
  return now >= opens && now < closes;
}

function eventosDisponiveisLista_(ss, spec) {
  return [5,6].map(function(day){return dataEventoAgenda_(ss,day);}).filter(function(event){
    if (!event || !janelaDataEventoAberta_(event)) return false;
    const group = spec.role === 'DJ' ? (event.day === 5 ? 'DJ_SEXTA' : 'DJ_SABADO') : 'INFLUENCER';
    return getOpcoesAtivas_(ss, group).length > 0;
  });
}

function rotuloEventoLista_(event) {
  const date = Utilities.formatDate(event.date, CONFIG.FUSO_HORARIO, 'dd/MM/yyyy');
  const party = event.eventName ? ' • ' + event.eventName : '';
  const terms = event.day === 5 ? 'R$ 30,00 em consumação • 00h às 03h' : 'R$ 60,00 em consumação • 23h à 01h';
  return event.label + ' • ' + date + party + ' • ' + terms;
}

function setChoiceValuesIfChanged_(item, values) {
  const current = item.getChoices().map(function (choice) { return choice.getValue(); });
  if (current.length === values.length && current.every(function (value, i) { return value === values[i]; })) return;
  item.setChoiceValues(values);
}

function sincronizarFormulariosUnificadosVerdant_(ss) {
  const props = PropertiesService.getScriptProperties();
  FORMULARIOS.filter(function(s){return s.kind === 'unified';}).forEach(function(spec){
    const id = props.getProperty('form_' + spec.key); if (!id) return;
    const form = FormApp.openById(id);
    const eventItem = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE).filter(function(i){return i.getTitle()==='Selecione o evento';})[0];
    const fridayTitle = spec.role === 'DJ' ? 'Selecione o DJ de sexta' : 'Selecione o influenciador de sexta';
    const saturdayTitle = spec.role === 'DJ' ? 'Selecione o DJ de sábado' : 'Selecione o influenciador de sábado';
    const fridayItem = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE).filter(function(i){return i.getTitle()===fridayTitle;})[0];
    const saturdayItem = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE).filter(function(i){return i.getTitle()===saturdayTitle;})[0];
    const fridayGroup = spec.role === 'DJ' ? 'DJ_SEXTA' : 'INFLUENCER';
    const saturdayGroup = spec.role === 'DJ' ? 'DJ_SABADO' : 'INFLUENCER';
    const fridayChoices = getOpcoesAtivas_(ss, fridayGroup), saturdayChoices = getOpcoesAtivas_(ss, saturdayGroup);
    if (fridayItem) setChoiceValuesIfChanged_(fridayItem.asMultipleChoiceItem(), fridayChoices.length ? fridayChoices : ['Nenhuma opção ativa']);
    if (saturdayItem) setChoiceValuesIfChanged_(saturdayItem.asMultipleChoiceItem(), saturdayChoices.length ? saturdayChoices : ['Nenhuma opção ativa']);
    if (!eventItem) return;
    const fridaySection = form.getItems(FormApp.ItemType.PAGE_BREAK).filter(function(i){return i.getTitle()==='Lista de sexta-feira';})[0];
    const saturdaySection = form.getItems(FormApp.ItemType.PAGE_BREAK).filter(function(i){return i.getTitle()==='Lista de sábado';})[0];
    const events = eventosDisponiveisLista_(ss,spec);
    const eventValues = events.map(rotuloEventoLista_);
    const currentValues = eventItem.asMultipleChoiceItem().getChoices().map(function(choice){return choice.getValue();});
    const sameEvents = currentValues.length === eventValues.length && currentValues.every(function(value,i){return value===eventValues[i];});
    if (!sameEvents && events.length) eventItem.asMultipleChoiceItem().setChoices(events.map(function(event){return eventItem.asMultipleChoiceItem().createChoice(rotuloEventoLista_(event), event.day===5?fridaySection.asPageBreakItem():saturdaySection.asPageBreakItem());}));
    else if (!events.length) setChoiceValuesIfChanged_(eventItem.asMultipleChoiceItem(), ['Nenhum evento disponível na agenda']);
  });
}

function prepararFormularioExistente_(form, spec) {
  form.setCollectEmail(true);
  const items = form.getItems();
  for (let i = items.length - 1; i >= 0; i--) {
    const title = String(items[i].getTitle() || '').trim().toLocaleLowerCase('pt-BR');
    if (title === 'e-mail' || title === 'email') form.deleteItem(items[i]);
  }
  const consentItem = form.getItems().filter(function (item) { return item.getTitle() === ACEITE_NOVIDADES; })[0];
  if (consentItem) {
    try { consentItem.asCheckboxItem().setRequired(false).setHelpText('Opcional. Sua escolha não altera sua inscrição na lista.'); } catch (e) {}
  }
  if (spec.key !== 'aniversario_sexta_sabado') return;
  const currentItems = form.getItems();
  const question = currentItems.filter(function (item) { return /dia da semana/i.test(item.getTitle()); })[0];
  if (!question) return;
  const title = 'Escolha um único dia para comemorar: sexta-feira ou sábado. Não é possível selecionar os dois.';
  try {
    const checkbox = question.asCheckboxItem();
    checkbox.setTitle(title);
    checkbox.setChoiceValues(['Sexta-feira', 'Sábado']);
      checkbox.setRequired(true);
    checkbox.setValidation(FormApp.createCheckboxValidation()
      .setHelpText('Selecione somente sexta-feira ou sábado. Não marque os dois dias.')
      .requireSelectAtMost(1)
      .build());
  } catch (e) {
    // Preserve the existing response-bearing items; a non-checkbox legacy field is left intact.
  }
}

function formularioCompleto_(form, spec) {
  const items = form.getItems();
  if (spec.kind === 'unified') {
    const titles = items.map(function (item) { return item.getTitle(); });
    const specific = spec.role === 'DJ' ? ['Selecione o DJ de sexta','Selecione o DJ de sábado'] : ['Selecione o influenciador de sexta','Selecione o influenciador de sábado'];
    return ['Nome completo, conforme consta no documento','Telefone/WhatsApp com DDD','Selecione o evento',ACEITE_NOVIDADES].concat(specific).every(function (title) { return titles.indexOf(title) >= 0; });
  }
  const titles = items.map(function (item) { return item.getTitle(); });
  const required = ['Nome completo, conforme consta no documento', 'Telefone/WhatsApp com DDD', ACEITE_NOVIDADES]
    .concat((spec.questions || []).map(function (q) { return q.title; }));
  if (required.some(function (title) { return titles.indexOf(title) < 0 || titles.filter(function (t) { return t === title; }).length !== 1; })) return false;
  for (let i = 0; i < (spec.questions || []).length; i++) {
    const q = spec.questions[i];
    if (q.type !== 'choice' && q.type !== 'checkbox') continue;
    const item = items.filter(function (candidate) { return candidate.getTitle() === q.title; })[0];
    try {
      const choices = q.type === 'choice' ? item.asMultipleChoiceItem().getChoices() : item.asCheckboxItem().getChoices();
      if (!choices.length) return false;
    } catch (e) { return false; }
  }
  const consentItem = items.filter(function (item) { return item.getTitle() === ACEITE_NOVIDADES; })[0];
  try { if (!consentItem.asCheckboxItem().getChoices().length) return false; } catch (e) { return false; }
  return true;
}

function limparItensFormulario_(form) {
  const items = form.getItems();
  for (let i = items.length - 1; i >= 0; i--) form.deleteItem(i);
}

function deduplicarOpcoes_(values) {
  const seen = {};
  return (values || []).map(function (value) { return String(value || '').trim(); }).filter(function (value) {
    const key = value.toLocaleLowerCase();
    if (!value || seen[key]) return false;
    seen[key] = true;
    return true;
  });
}

function addRequiredText_(form, title) {
  form.addTextItem().setTitle(title).setRequired(true);
}

function getOrCreateFolder_(props) {
  const id = props.getProperty('folder_id');
  if (id) {
    try {
      const existing = DriveApp.getFolderById(id);
      existing.setName(CONFIG.PASTA);
      return existing;
    } catch (e) {}
  }
  const folder = DriveApp.createFolder(CONFIG.PASTA);
  props.setProperty('folder_id', folder.getId());
  return folder;
}

function getOrCreateSpreadsheet_(props, folder) {
  const id = props.getProperty('spreadsheet_id');
  if (id) {
    try {
      const existing = SpreadsheetApp.openById(id);
      existing.setName(CONFIG.PLANILHA);
      DriveApp.getFileById(existing.getId()).moveTo(folder);
      return existing;
    } catch (e) {}
  }
  const spreadsheet = SpreadsheetApp.create(CONFIG.PLANILHA);
  props.setProperty('spreadsheet_id', spreadsheet.getId());
  DriveApp.getFileById(spreadsheet.getId()).moveTo(folder);
  return spreadsheet;
}

function getExistingForm_(props, key) {
  const id = props.getProperty('form_' + key);
  if (!id) return null;
  try { return FormApp.openById(id); } catch (e) { return null; }
}

function inicializarCentral_(ss) {
  const formIndex = getOrCreateSheet_(ss, 'Formulários');
  formIndex.getRange(1, 1, 1, 5).setValues([['Lista', 'Link para editar', 'Link para responder', 'Aba de respostas', 'Status']]);
  estilizarCabecalho_(formIndex, 1, 5);

  const summary = getOrCreateSheet_(ss, 'Resumo');
  prepararResumoVerdant_(summary);

  const options = getOrCreateSheet_(ss, 'Cadastro de Opções');
  options.getRange(1, 1, 1, 3).setValues([['Tipo', 'Nome para aparecer no formulário', 'Status']]);
  estilizarCabecalho_(options, 1, 3);
  if (options.getLastRow() <= 1) {
    const seeds = [];
    FORMULARIOS.forEach(function (spec) {
      const group = grupoOpcao_(spec.key);
      (spec.questions || []).forEach(function (q) {
        if (group && q.type === 'choice' && q.choices) q.choices.forEach(function (name) { seeds.push([group, name, 'Ativo']); });
      });
    });
    if (seeds.length) options.getRange(2, 1, seeds.length, 3).setValues(seeds);
  }

  const configs = getOrCreateSheet_(ss, 'Configurações');
  configs.getRange(1, 1, 1, 3).setValues([['Grupo', 'Nome', 'Status']]);
  estilizarCabecalho_(configs, 1, 3);
  if (configs.getLastRow() <= 1) {
    const existingOptions = options.getLastRow() > 1 ? options.getRange(2, 1, options.getLastRow() - 1, 3).getValues() : [];
    const seedsConfig = existingOptions.filter(function (row) { return row[0] && row[1]; });
    [
      ['VIP', 'ALLE RIBAS', 'Ativo'], ['VIP', 'ANA PAULA', 'Ativo'],
      ['VIP', 'ELIAS FORTESKI', 'Ativo'], ['VIP', 'WELL BRUNINI', 'Ativo'],
      ['VIP', 'MÔNICA ORTIZ', 'Ativo'], ['VIP', 'ELISON GARCIA', 'Ativo'],
      ['VIP', 'EDUARDO LIMA', 'Ativo']
    ].forEach(function (row) { seedsConfig.push(row); });
    if (seedsConfig.length) configs.getRange(2, 1, seedsConfig.length, 3).setValues(seedsConfig);
  }
  configs.setFrozenRows(1);
  configs.setTabColor(CONFIG.COR_AMARELO);
  configs.getRange('C2:C').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['Ativo', 'Inativo'], true).build());
  configs.setColumnWidths(1, 3, 210);
  configs.autoResizeColumns(1, 3);
  options.hideSheet();

  inicializarAgendaEventosVerdant_(ss);

  const unified = getOrCreateSheet_(ss, 'Lista Única');
  const unifiedHeaders = ['Data/hora', 'Evento', 'Categoria', 'Nome completo', 'Telefone/WhatsApp', 'E-mail', 'Aceite de novidades', 'Detalhes específicos', 'Formulário de origem', 'ID da resposta'];
  if (unified.getRange('A1').isBlank()) unified.getRange(1, 1, 1, unifiedHeaders.length).setValues([unifiedHeaders]);
  estilizarCabecalho_(unified, 1, unifiedHeaders.length);
  unified.setFrozenRows(1);
  unified.setTabColor(CONFIG.COR_ROSA);
  if (!unified.getFilter()) unified.getRange(1, 1, Math.max(unified.getMaxRows(), 2), unifiedHeaders.length).createFilter();
  unified.setColumnWidths(1, 1, 155); unified.setColumnWidths(2, 2, 145); unified.setColumnWidth(4, 245);
  unified.setColumnWidths(5, 2, 190); unified.setColumnWidth(7, 175); unified.setColumnWidth(8, 360);
  unified.setColumnWidth(9, 245); unified.hideColumns(10);

  const djs = getOrCreateSheet_(ss, 'Cadastro DJs');
  djs.getRange('A1').setValue('VERDANT | CADASTRO DE DJs');
  djs.getRange('A2').setValue('Inclua a data, o DJ e a pista. As linhas [TESTE] são apenas demonstração e podem ser removidas após a conferência.');
  djs.getRange('A3:C3').setValues([['Data do evento', 'Nome do DJ', 'Pista']]);
  estilizarCabecalho_(djs, 3, 3);
  if (djs.getLastRow() <= 3) {
    const demoDates = datasDemoDJsVerdant_();
    const demoDjs = [];
    for (let i = 0; i < 20; i++) demoDjs.push([i < 10 ? demoDates.friday : demoDates.saturday, '[TESTE] DJ ' + String(i + 1).padStart(2, '0'), i % 2 ? 'Pista LAND' : 'Pista SKY']);
    djs.getRange(4, 1, demoDjs.length, 3).setValues(demoDjs);
  }
  djs.getRange('A4:A503').setNumberFormat('dd/mm/yyyy');
  djs.getRange('A4:A503').setDataValidation(SpreadsheetApp.newDataValidation().requireDate().build());
  djs.getRange('C4:C503').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['Pista SKY', 'Pista LAND'], true).build());

  const schedule = getOrCreateSheet_(ss, 'Programação DJs');
  schedule.getRange('A1').setValue('VERDANT | PROGRAMAÇÃO DE DJs');
  schedule.getRange('A2').setValue('Escala automática: cada pista é distribuída das 23h às 07h, com tempo igual por DJ. Atualize o Cadastro DJs para recalcular.');
  schedule.getRange('A4:F4').setValues([['Data', 'Pista', 'DJ', 'Início', 'Fim', 'Duração']]);
  estilizarCabecalho_(schedule, 4, 6);
  atualizarProgramacaoDJsVerdant_(ss);
  estilizarAbaCadastroDJsVerdant_(djs);
  estilizarAbaProgramacaoDJsVerdant_(schedule);

  prepararAbaExportarLista_(getOrCreateSheet_(ss, 'Exportar Lista'));
  const exportSheet = getOrCreateSheet_(ss, 'Exportar Meta');
  exportSheet.getRange('A1:G1').setValues([['Data do cadastro', 'Nome completo', 'Telefone E.164', 'E-mail', 'Origem', 'Consentimento', 'ID interno da resposta']]);
  estilizarCabecalho_(exportSheet, 1, 7);
  exportSheet.hideColumns(7);
  [formIndex, summary, options, configs, unified, djs, schedule, exportSheet].forEach(function (sheet) {
    sheet.setFrozenRows(sheet.getName() === 'Cadastro DJs' ? 3 : sheet.getName() === 'Programação DJs' ? 4 : 1);
  });
  [formIndex, summary, options, configs, unified, djs, schedule, exportSheet].forEach(function (sheet) { sheet.autoResizeColumns(1, Math.min(sheet.getMaxColumns(), 8)); });
  estilizarAbaFormularios_(formIndex);
  estilizarAbaResumo_(summary);
  estilizarAbaCadastroDJsVerdant_(djs);
  estilizarAbaProgramacaoDJsVerdant_(schedule);
  atualizarResumoVerdant_();
}

function conectarAbaRespostas_(form, spec, ss, props) {
  const propertyKey = 'response_sheet_id_' + spec.key;
  let responseSheet = null;
  const savedSheetId = props.getProperty(propertyKey);
  if (savedSheetId) responseSheet = getSheetById_(ss, Number(savedSheetId));

  let currentDestinationId = null;
  try { currentDestinationId = form.getDestinationId(); } catch (e) { currentDestinationId = null; }
  if (currentDestinationId !== ss.getId()) {
    const before = {};
    ss.getSheets().forEach(function (sheet) { before[sheet.getSheetId()] = true; });
    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
    SpreadsheetApp.flush();
    responseSheet = aguardarAbaNova_(ss, before);
  }
  if (!responseSheet) responseSheet = localizarAbaResposta_(form, spec, ss, props);
  if (responseSheet && responseSheet.getName() !== spec.responseSheet) {
    const nameConflict = ss.getSheetByName(spec.responseSheet);
    if (nameConflict && nameConflict.getSheetId() !== responseSheet.getSheetId()) {
      throw new Error('Já existe uma aba chamada ' + spec.responseSheet + '. Renomeie-a para o script organizar as respostas.');
    }
    responseSheet.setName(spec.responseSheet);
  }
  if (responseSheet) {
    props.setProperty(propertyKey, String(responseSheet.getSheetId()));
    responseSheet.setFrozenRows(1);
  }
  return responseSheet;
}

function aguardarAbaNova_(ss, before) {
  for (let attempt = 0; attempt < 15; attempt++) {
    SpreadsheetApp.flush();
    const added = ss.getSheets().filter(function (sheet) { return !before[sheet.getSheetId()]; });
    if (added.length) return added[added.length - 1];
    Utilities.sleep(300);
  }
  return null;
}

function localizarAbaResposta_(form, spec, ss, props) {
  const used = {};
  FORMULARIOS.forEach(function (other) {
    const id = props.getProperty('response_sheet_id_' + other.key);
    if (id) used[Number(id)] = true;
  });
  const itemTitles = form.getItems().map(function (item) { return item.getTitle(); });
  const candidates = ss.getSheets().filter(function (sheet) {
    if (used[sheet.getSheetId()]) return false;
    const name = sheet.getName();
    return /^Form Responses?/i.test(name) || /^Respostas ao formulário/i.test(name) || name === spec.responseSheet;
  });
  let best = null;
  let bestScore = 0;
  candidates.forEach(function (sheet) {
    const width = Math.max(sheet.getLastColumn(), 1);
    const headers = sheet.getRange(1, 1, 1, width).getDisplayValues()[0];
    const score = itemTitles.filter(function (title) { return headers.indexOf(title) >= 0; }).length;
    if (score > bestScore) { bestScore = score; best = sheet; }
  });
  if (best) return best;
  candidates.sort(function (a, b) { return responseTabNumber_(a.getName()) - responseTabNumber_(b.getName()); });
  return candidates[0] || null;
}

function responseTabNumber_(name) {
  const match = name.match(/(\d+)$/);
  return match ? Number(match[1]) : 999999;
}

function getSheetById_(ss, id) {
  return ss.getSheets().filter(function (sheet) { return sheet.getSheetId() === id; })[0] || null;
}

function getOrCreateSheet_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function estilizarCabecalho_(sheet, row, width) {
  sheet.getRange(row, 1, 1, width).setFontWeight('bold').setBackground('#164734').setFontColor('#ffffff').setWrap(true);
}

function datasDemoDJsVerdant_() {
  const dateText = Utilities.formatDate(new Date(), CONFIG.FUSO_HORARIO, 'yyyy-MM-dd').split('-').map(Number);
  const friday = new Date(Date.UTC(dateText[0], dateText[1] - 1, dateText[2], 12));
  const dayOfWeek = friday.getUTCDay();
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7;
  friday.setUTCDate(friday.getUTCDate() + daysUntilFriday);
  const saturday = new Date(friday.getTime());
  saturday.setUTCDate(saturday.getUTCDate() + 1);
  const sunday = new Date(saturday.getTime());
  sunday.setUTCDate(sunday.getUTCDate() + 1);
  return {friday: friday, saturday: saturday, sunday: sunday};
}

function atualizarProgramacaoDJsVerdant_(ss) {
  const source = ss.getSheetByName('Cadastro DJs');
  const target = ss.getSheetByName('Programação DJs');
  if (!source || !target) return;
  const lastRow = source.getLastRow();
  const data = lastRow >= 4 ? source.getRange(4, 1, lastRow - 3, 3).getValues() : [];
  const grouped = {};
  data.forEach(function (row) {
    const date = row[0], dj = String(row[1] || '').trim(), track = String(row[2] || '').trim();
    if (!(date instanceof Date) || isNaN(date.getTime()) || !dj || !track) return;
    const dateKey = Utilities.formatDate(date, CONFIG.FUSO_HORARIO, 'yyyy-MM-dd');
    const key = dateKey + '|' + track;
    if (!grouped[key]) grouped[key] = {date: date, track: track, djs: []};
    grouped[key].djs.push(dj);
  });
  const groups = Object.keys(grouped).map(function (key) { return grouped[key]; });
  groups.sort(function (a, b) { return a.date.getTime() - b.date.getTime() || a.track.localeCompare(b.track, 'pt-BR'); });
  const output = [];
  groups.forEach(function (group) {
    const count = group.djs.length;
    const slotMinutes = 480 / count;
    group.djs.forEach(function (dj, index) {
      const startMinutes = 23 * 60 + index * slotMinutes;
      const endMinutes = 23 * 60 + (index + 1) * slotMinutes;
      output.push([
        group.date,
        group.track,
        dj,
        ((startMinutes % 1440) / 1440),
        ((endMinutes % 1440) / 1440),
        (slotMinutes / 1440)
      ]);
    });
  });
  const clearRows = Math.max(target.getMaxRows() - 4, 1);
  target.getRange(5, 1, clearRows, 6).clearContent();
  if (output.length) target.getRange(5, 1, output.length, 6).setValues(output);
  const rows = Math.max(output.length, 1);
  target.getRange(5, 1, rows, 1).setNumberFormat('dd/mm/yyyy');
  target.getRange(5, 4, rows, 2).setNumberFormat('hh:mm');
  target.getRange(5, 6, rows, 1).setNumberFormat('[h]:mm');
  estilizarAbaProgramacaoDJsVerdant_(target);
}

function estilizarAbaCadastroDJsVerdant_(sheet) {
  sheet.setHiddenGridlines(true);
  sheet.setTabColor(CONFIG.COR_ROXO);
  sheet.getRange('A1:C1').breakApart().merge().setBackground('#123D2D').setFontColor('#FFFFFF').setFontFamily('Arial').setFontSize(17).setFontWeight('bold').setVerticalAlignment('middle');
  sheet.getRange('A2:C2').breakApart().merge().setBackground('#EAF3ED').setFontColor(CONFIG.COR_TEXTO).setFontFamily('Arial').setFontSize(10).setWrap(true).setVerticalAlignment('middle');
  sheet.setRowHeight(1, 42); sheet.setRowHeight(2, 38);
  sheet.getRange('A3:C3').setBackground(CONFIG.COR_VERDE).setFontColor('#FFFFFF').setFontWeight('bold').setFontFamily('Arial').setWrap(true).setVerticalAlignment('middle');
  sheet.setRowHeight(3, 32);
  sheet.getBandings().forEach(function (banding) { banding.remove(); });
  const last = Math.max(sheet.getLastRow(), 4);
  sheet.getRange('A4:C' + last).setFontFamily('Arial').setFontColor(CONFIG.COR_TEXTO).setVerticalAlignment('middle').applyRowBanding(SpreadsheetApp.BandingTheme.GREEN, true, false);
  if (!sheet.getFilter()) sheet.getRange(3, 1, Math.max(last - 2, 2), 3).createFilter();
  sheet.setColumnWidth(1, 150); sheet.setColumnWidth(2, 245); sheet.setColumnWidth(3, 170);
  sheet.setFrozenRows(3);
}

function estilizarAbaProgramacaoDJsVerdant_(sheet) {
  sheet.setHiddenGridlines(true);
  sheet.setTabColor(CONFIG.COR_AMARELO);
  sheet.getRange('A1:F1').breakApart().merge().setBackground('#123D2D').setFontColor('#FFFFFF').setFontFamily('Arial').setFontSize(17).setFontWeight('bold').setVerticalAlignment('middle');
  sheet.getRange('A2:F2').breakApart().merge().setBackground('#EAF3ED').setFontColor(CONFIG.COR_TEXTO).setFontFamily('Arial').setFontSize(10).setWrap(true).setVerticalAlignment('middle');
  sheet.setRowHeight(1, 42); sheet.setRowHeight(2, 38);
  sheet.getRange('A4:F4').setBackground(CONFIG.COR_VERDE).setFontColor('#FFFFFF').setFontFamily('Arial').setFontWeight('bold').setWrap(true).setVerticalAlignment('middle');
  sheet.setRowHeight(4, 32);
  sheet.getBandings().forEach(function (banding) { banding.remove(); });
  const last = Math.max(sheet.getLastRow(), 5);
  sheet.getRange('A5:F' + last).setFontFamily('Arial').setFontColor(CONFIG.COR_TEXTO).setVerticalAlignment('middle').applyRowBanding(SpreadsheetApp.BandingTheme.GREEN, true, false);
  sheet.getRange('A5:A' + last).setNumberFormat('dd/mm/yyyy');
  sheet.getRange('D5:E' + last).setNumberFormat('hh:mm');
  sheet.getRange('F5:F' + last).setNumberFormat('[h]:mm');
  sheet.setColumnWidth(1, 150); sheet.setColumnWidth(2, 160); sheet.setColumnWidth(3, 245);
  sheet.setColumnWidths(4, 3, 120);
  sheet.setFrozenRows(4);
}

function estilizarAbaResumo_(sheet) {
  const cols = 6;
  sheet.setHiddenGridlines(true);
  sheet.setTabColor(CONFIG.COR_VERDE);
  sheet.getRange(1, 1, 1, cols).breakApart(); sheet.getRange(1, 1, 1, cols).merge();
  sheet.getRange('A1').setBackground('#64C082').setFontColor('#173326').setFontFamily('Arial').setFontSize(18).setFontWeight('bold').setHorizontalAlignment('left').setVerticalAlignment('middle');
  sheet.setRowHeight(1, 48);
  sheet.getRange(2, 1, 1, cols).breakApart(); sheet.getRange(2, 1, 1, cols).merge();
  sheet.getRange('A2').setBackground('#F4FAF6').setFontColor('#26352D').setFontFamily('Arial').setFontSize(10).setVerticalAlignment('middle');
  sheet.setRowHeight(2, 32);
  sheet.getRange('A3:D3').setBackground('#EFF6F1').setFontColor('#26352D').setFontFamily('Arial').setFontWeight('bold').setVerticalAlignment('middle');
  sheet.getRange('A4:F4').setFontFamily('Arial').setFontSize(9).setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle').setWrap(true);
  const cardColors = ['#64C082','#568CC9','#AF83BB','#47C2C9','#ECB7D4','#FEE933'];
  const cardInk = ['#173326','#102A43','#2C1D32','#11363A','#3D2031','#403A0D'];
  const cardTints = ['#EFF8F2','#EEF4FA','#F5EFF7','#ECF8F8','#FBF1F6','#FFFBE5'];
  cardColors.forEach(function (color, i) {
    sheet.getRange(4, i + 1).setBackground(color).setFontColor(cardInk[i]);
    sheet.getRange(5, i + 1).setBackground(cardTints[i]).setFontColor('#24352E');
  });
  sheet.getRange('A5:F5').setFontFamily('Arial').setFontWeight('bold').setFontSize(15).setHorizontalAlignment('center').setVerticalAlignment('middle');
  sheet.setRowHeight(4, 48);
  sheet.setRowHeight(5, 42);
  sheet.getRange('A7:F7').setBackground('#64C082').setFontColor('#173326').setFontFamily('Arial').setFontSize(10).setFontWeight('bold').setVerticalAlignment('middle').setWrap(true);
  sheet.getBandings().forEach(function (banding) { banding.remove(); });
  const table = sheet.getRange(8, 1, FORMULARIOS.length, 6);
  table.setFontFamily('Arial').setFontSize(9).setFontColor('#26352D').setVerticalAlignment('middle').setWrap(true)
    .setBorder(true, true, true, true, true, true, '#DCE8DE', SpreadsheetApp.BorderStyle.SOLID);
  const fills = [];
  for (let i = 0; i < FORMULARIOS.length; i++) fills.push(new Array(6).fill(i % 2 ? '#FFFFFF' : '#F4FAF6'));
  table.setBackgrounds(fills);
  sheet.getRange(8, 2, FORMULARIOS.length, 2).setHorizontalAlignment('center');
  sheet.getRange(8, 5, FORMULARIOS.length, 2).setHorizontalAlignment('right');
  sheet.getRange('A16:F16').setBackground('#E6F3E9').setFontFamily('Arial').setFontWeight('bold').setFontColor('#173326')
    .setBorder(true, true, true, true, true, true, '#64C082', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  sheet.getRange('A17:F17').setBackground('#568CC9').setFontColor('#102A43').setFontWeight('bold').setFontFamily('Arial').setVerticalAlignment('middle');
  sheet.setRowHeight(17, 32);
  sheet.getRange('A18:F21').setBackground('#EEF4FA').setFontColor('#26352D').setFontFamily('Arial').setVerticalAlignment('middle');
  sheet.getRange('A18:D21').setFontWeight('bold').setHorizontalAlignment('left');
  sheet.getRange('E18:E21').setHorizontalAlignment('center').setBackground('#ECB7D4');
  sheet.getRange('A22:F22').setBackground('#FFFBE5').setFontColor('#26352D').setFontFamily('Arial').setFontSize(9).setWrap(true);
  sheet.setRowHeight(22, 36);
  sheet.setRowHeights(8, FORMULARIOS.length, 42);
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidths(2, 2, 100);
  sheet.setColumnWidth(4, 245); sheet.setColumnWidth(5, 145); sheet.setColumnWidth(6, 165);
  sheet.setColumnWidth(7, 145);
  sheet.setFrozenRows(7);
}

function estilizarAbaFormularios_(sheet) {
  const lastRow = Math.max(sheet.getLastRow(), 1);
  sheet.setHiddenGridlines(true);
  sheet.setTabColor(CONFIG.COR_AZUL);
  sheet.getRange(1, 1, 1, 5).setBackground('#164734').setFontColor('#ffffff').setFontFamily('Arial').setFontWeight('bold').setWrap(true).setVerticalAlignment('middle');
  sheet.setRowHeight(1, 42);
  sheet.getBandings().forEach(function (banding) { banding.remove(); });
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, 5).setFontFamily('Arial').setFontColor(CONFIG.COR_TEXTO).setVerticalAlignment('middle').setWrap(true).applyRowBanding(SpreadsheetApp.BandingTheme.GREEN, true, false);
    sheet.getRange(2, 5, lastRow - 1, 1).setHorizontalAlignment('center');
  }
  sheet.setColumnWidth(1, 280);
  sheet.setColumnWidths(2, 2, 330);
  sheet.setColumnWidth(4, 210);
  sheet.setColumnWidth(5, 110);
  sheet.setFrozenRows(1);
}

const LOGO_VERDANT_PNG_BASE64 = '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';

const VERDANT_TIMBRADO_DOC_ID = '1cjy4PnYWTMpQ5lcLPmt9jt-TNV7H4VRJ-n0c3I38QlU';

function obterLogoVerdant_() {
  return Utilities.newBlob(Utilities.base64Decode(LOGO_VERDANT_PNG_BASE64), 'image/png', 'Logo-Verdant-Cor.png');
}

/** Gera o PDF de portaria usando o papel timbrado oficial e a sequência do modelo MOONLIGHT. */
function exportarListaVerdantPDF() {
  if (typeof Docs === 'undefined') throw new Error('Ative o serviço avançado Google Docs API: no Apps Script, clique em Serviços (+), selecione Google Docs API e clique em Adicionar. Depois execute a exportação novamente.');
  const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('spreadsheet_id'));
  const cfg = getOrCreateSheet_(ss, 'Exportar Lista');
  prepararAbaExportarLista_(cfg);
  let uiDate = cfg.getRange('B3').getValue();
  if (!(uiDate instanceof Date) || isNaN(uiDate.getTime())) {
    // A comparação Moonlight é de sábado; usa o sábado de teste para evitar exportar listas vazias de sexta.
    if (isComparativoMoonlight_(ss)) {
      uiDate = datasDemoDJsVerdant_().saturday;
      cfg.getRange('B3').setValue(uiDate).setNumberFormat('dd/mm/yyyy');
      Logger.log('Comparação Moonlight: usando o próximo sábado (' + Utilities.formatDate(uiDate, CONFIG.FUSO_HORARIO, 'dd/MM/yyyy') + ').');
    } else if (ss.getSheetByName('Dados de Teste')) {
      uiDate = datasDemoDJsVerdant_().friday;
      cfg.getRange('B3').setValue(uiDate).setNumberFormat('dd/mm/yyyy');
      Logger.log('Modo de teste: usando a próxima sexta-feira (' + Utilities.formatDate(uiDate, CONFIG.FUSO_HORARIO, 'dd/MM/yyyy') + '). Para testar sábado, preencha Exportar Lista!B3 com a data correspondente.');
    } else {
      throw new Error('Preencha Exportar Lista!B3 com a data do evento (sexta ou sábado) e execute novamente.');
    }
  }
  const folder = DriveApp.getFolderById(PropertiesService.getScriptProperties().getProperty('folder_id'));
  const dateText = Utilities.formatDate(uiDate, CONFIG.FUSO_HORARIO, 'yyyy-MM-dd');
  const parts = dateText.split('-').map(Number);
  const isoDay = Number(Utilities.formatDate(uiDate, CONFIG.FUSO_HORARIO, 'u'));
  if (isoDay !== 5 && isoDay !== 6) throw new Error('A data do evento deve cair em uma sexta-feira ou sábado.');
  const day = isoDay;
  const startDate = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] - ((isoDay - 2 + 7) % 7), 12));
  const startText = Utilities.formatDate(startDate, CONFIG.FUSO_HORARIO, 'yyyy-MM-dd');
  const start = new Date(startText + 'T20:00:00-03:00');
  const end = new Date(dateText + 'T19:00:00-03:00');
  const dateLabel = Utilities.formatDate(uiDate, CONFIG.FUSO_HORARIO, 'dd.MM');
  const sections = montarSecoesLista_(ss, start, end, day).filter(function (section) {
    return section.groups.some(function (group) { return group.names && group.names.length; });
  });
  const pdf = verdantCriarPdfTimbrado_('LISTAS VERDANT - ' + dateLabel, sections, true);
  pdf.setName('LISTAS VERDANT - ' + dateLabel + '.pdf');
  const pdfFile = folder.createFile(pdf);
  cfg.getRange('B4').setValue(pdfFile.getUrl());
  Logger.log('PDF: ' + pdfFile.getUrl());
  return pdfFile.getUrl();
}

/** Cria um PDF usando o timbrado oficial e apaga a cópia temporária do Docs. */
function verdantCriarPdfTimbrado_(title, sections, twoColumns) {
  if (typeof Docs === 'undefined') throw new Error('Ative o serviço avançado Google Docs API (Docs) no Apps Script para gerar PDFs no timbrado.');
  const temporary = DriveApp.getFileById(VERDANT_TIMBRADO_DOC_ID).makeCopy('TEMP • ' + title);
  try {
    const doc = DocumentApp.openById(temporary.getId());
    const body = doc.getBody();
    body.clear();
    body.appendParagraph(title).setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontFamily('Arial').setFontSize(10).setBold(true).setForegroundColor('#183f53')
      .setLineSpacing(1).setSpacingBefore(0).setSpacingAfter(14);
    (sections || []).forEach(function (section) {
      body.appendParagraph('• ' + section.title).setFontFamily('Arial').setFontSize(9).setBold(true)
        .setForegroundColor('#183f53').setLineSpacing(1).setSpacingBefore(8).setSpacingAfter(3);
      (section.groups || []).forEach(function (group) {
        if (group.label) body.appendParagraph('→ ' + group.label).setFontFamily('Arial').setFontSize(9).setBold(true).setForegroundColor('#183f53').setLineSpacing(1).setSpacingBefore(4).setSpacingAfter(1);
        (group.names || []).forEach(function (name, i) {
          const line = group.numbered ? (i + 1) + '.   ' + name : name;
          body.appendParagraph(line).setFontFamily('Arial').setFontSize(9).setBold(false).setForegroundColor('#172a35').setLineSpacing(1).setSpacingBefore(0).setSpacingAfter(0).setIndentStart(0);
        });
      });
    });
    doc.saveAndClose();
    if (twoColumns) {
      Docs.Documents.batchUpdate({requests:[{updateSectionStyle:{range:{startIndex:0,endIndex:Math.max(1,body.getText().length+1)},sectionStyle:{columnProperties:[{paddingEnd:{magnitude:24,unit:'PT'}},{paddingEnd:{magnitude:0,unit:'PT'}}],columnSeparatorStyle:'NONE'},fields:'columnProperties,columnSeparatorStyle'}}]}, doc.getId());
    }
    return DriveApp.getFileById(doc.getId()).getAs(MimeType.PDF).setName(title + '.pdf');
  } finally {
    temporary.setTrashed(true);
  }
}

function prepararAbaExportarLista_(sheet) {
  if (sheet.getRange('A1').isBlank()) {
    sheet.getRange('A1:B4').setValues([
      ['VERDANT | EXPORTAR LISTA DE PORTARIA', ''],
      ['O PDF será gerado no papel timbrado oficial Verdant. Use o menu VERDANT > Gerar PDF de portaria… e informe a data do evento (sexta ou sábado).', ''],
      ['Data do evento', ''],
      ['Link do último PDF gerado', '']
    ]);
    sheet.getRange('B3').setNumberFormat('dd/mm/yyyy');
  }
  sheet.setHiddenGridlines(true);
  sheet.setTabColor(CONFIG.COR_ROSA);
  sheet.getRange('A1:B1').merge().setBackground('#164734').setFontColor('#ffffff').setFontFamily('Arial').setFontSize(15).setFontWeight('bold');
  sheet.getRange('A2:B2').merge().setBackground('#F2F7F3').setFontColor(CONFIG.COR_TEXTO).setWrap(true);
  sheet.getRange('A3:A4').setFontWeight('bold').setBackground('#E7F3E9').setFontColor(CONFIG.COR_TEXTO);
  sheet.getRange('B3').setBackground('#FFF9CC').setNumberFormat('dd/mm/yyyy');
  sheet.getRange('B4').setWrap(true);
  sheet.setColumnWidth(1, 340); sheet.setColumnWidth(2, 430); sheet.setRowHeight(1, 38); sheet.setRowHeight(2, 44);
}

function montarSecoesLista_(ss, start, end, eventDay) {
  const vip = isComparativoMoonlight_(ss)
    ? Array.from({length:7}, function (_, i) { return 'VIP Teste ' + String(i + 1).padStart(3, '0'); })
    : getOpcoesAtivas_(ss, 'VIP');
  const sections = [{title:'INFLUENCIADORES (VIP)', groups:[{label:'', names:vip, numbered:true}]}];
  const friday = eventDay === 5;
  const influencerKey = friday ? 'influencer_sexta' : 'influencer_sabado';
  const djKey = friday ? 'dj_sexta' : 'dj_sabado';
  const influencerSpec = FORMULARIOS.filter(function (x) { return x.key === influencerKey; })[0];
  sections.push({
    title: friday ? 'LISTA INFLUENCERS (R$ 30,00 CONSUMAÇÃO) DAS 00H ATÉ 03H' : 'LISTA INFLUENCERS (R$ 60,00 CONSUMAÇÃO) DAS 23H ATÉ 01H',
    groups: agruparRespostasLista_(ss, influencerSpec, start, end, 0, false)
  });
  const birthdaySpec = FORMULARIOS.filter(function (x) { return x.key === 'aniversario_sexta_sabado'; })[0];
  const birthdayText = friday ? 'LISTA ANIVERSÁRIO (CONVIDADOS PAGAM O VALOR DA PORTARIA) DAS 00H ATÉ 03H' : 'LISTA ANIVERSÁRIO (R$ 50,00 CONSUMAÇÃO) DAS 23H ATÉ 01H';
  sections.push({title:birthdayText, groups:agruparRespostasLista_(ss, birthdaySpec, start, end, -1, friday)});
  const djSpec = FORMULARIOS.filter(function (x) { return x.key === djKey; })[0];
  sections.push({
    title: friday ? 'LISTA DJS (R$ 30,00 CONSUMAÇÃO) DAS 00H ATÉ 03H' : 'LISTA DJS (R$ 60,00 CONSUMAÇÃO) DAS 23H ATÉ 01H',
    groups: agruparRespostasLista_(ss, djSpec, start, end, 0, false)
  });
  if (!friday) {
    const friend = FORMULARIOS.filter(function (x) { return x.key === 'lista_amiga_sabado'; })[0];
    sections.push({title:'LISTA LOVERS (R$ 70,00 CONSUMAÇÃO) DAS 23H ATÉ 01H', groups:agruparRespostasLista_(ss, friend, start, end, -1, false, true)});
    const lover = FORMULARIOS.filter(function (x) { return x.key === 'canal_lover_sabado'; })[0];
    sections.push({title:'CANAL LOVER (R$ 70,00 CONSUMAÇÃO) DAS 23H ATÉ 01H', groups:agruparRespostasLista_(ss, lover, start, end, -1, false, true)});
  }
  return sections;
}

function agruparRespostasLista_(ss, spec, start, end, groupAnswerIndex, isFridayBirthday, flatten) {
  const sheet = ss.getSheetByName(spec.responseSheet);
  const fallbackHeaders = ['Carimbo de data/hora', 'Nome completo, conforme consta no documento', 'Marque o nome do DJ', 'Selecione o dia da semana', 'Informe os nomes completos dos convidados', 'Data de nascimento'];
  const headers = sheet && sheet.getLastColumn() ? sheet.getRange(1,1,1,sheet.getLastColumn()).getDisplayValues()[0] : fallbackHeaders;
  const testSheet = ss.getSheetByName('Dados de Teste');
  const comparisonMode = isComparativoMoonlight_(ss);
  const vals = !comparisonMode && sheet && sheet.getLastRow() >= 2 ? sheet.getRange(2,1,sheet.getLastRow()-1,sheet.getLastColumn()).getValues() : [];
  if (!comparisonMode && (spec.key === 'dj_sexta' || spec.key === 'dj_sabado' || spec.key === 'influencer_sexta' || spec.key === 'influencer_sabado')) {
    const unifiedName = /dj_/.test(spec.key) ? 'Lista DJs Unificada' : 'Lista Influencers Unificada';
    const unifiedSheet = ss.getSheetByName(unifiedName);
    if (unifiedSheet && unifiedSheet.getLastRow() >= 2) {
      const uHeaders = unifiedSheet.getRange(1,1,1,unifiedSheet.getLastColumn()).getDisplayValues()[0];
      const uRows = unifiedSheet.getRange(2,1,unifiedSheet.getLastRow()-1,unifiedSheet.getLastColumn()).getValues();
      const wantedDay = /_sabado$/.test(spec.key) ? 'Sábado' : 'Sexta-feira';
      const timeIndex = uHeaders.findIndex(function(h){return /carimbo de data|timestamp/i.test(h);});
      const uNameIndex = uHeaders.indexOf('Nome completo, conforme consta no documento');
      const uEventIndex = uHeaders.indexOf('Selecione o evento');
      const choiceTitle = /dj_/.test(spec.key) ? (wantedDay === 'Sábado' ? 'Selecione o DJ de sábado' : 'Selecione o DJ de sexta') : (wantedDay === 'Sábado' ? 'Selecione o influenciador de sábado' : 'Selecione o influenciador de sexta');
      const uGroupIndex = uHeaders.indexOf(choiceTitle);
      uRows.forEach(function(uRow){
        if (uEventIndex < 0 || diaDaEscolhaEvento_(uRow[uEventIndex]) !== wantedDay) return;
        const synthetic = new Array(headers.length).fill('');
        if (timestampIndex >= 0 && timeIndex >= 0) synthetic[timestampIndex] = uRow[timeIndex];
        if (nameIndex >= 0 && uNameIndex >= 0) synthetic[nameIndex] = uRow[uNameIndex];
        if (groupIndex >= 0 && uGroupIndex >= 0) synthetic[groupIndex] = uRow[uGroupIndex];
        vals.push(synthetic);
      });
    }
  }
  const timestampIndex = headers.findIndex(function(h){return /carimbo de data|timestamp/i.test(h);});
  const nameIndex = headers.indexOf('Nome completo, conforme consta no documento');
  const groupIndex = headers.findIndex(function (h) { return /influenciador|marque o nome do dj/i.test(h); });
  const consentIndex = headers.indexOf(ACEITE_NOVIDADES);
  const groups = {}; const ordered = [];
  if (testSheet && testSheet.getLastRow() >= 2) {
    const tests = testSheet.getRange(2, 1, testSheet.getLastRow() - 1, 10).getValues();
    const daysIndex = headers.findIndex(function(h){return /dia da semana/i.test(h);});
    const guestIndex = headers.findIndex(function(h){return /convidados/i.test(h);});
    const birthDateIndex = headers.findIndex(function(h){return /data de nascimento/i.test(h);});
    tests.forEach(function (test) {
      if (test[2] !== categoriaLista_(spec.key) || !(test[0] instanceof Date) || test[0] < start || test[0] > end) return;
      const selectedEvent = String(test[1] || '');
      const eventName = isFridayBirthday ? 'Sexta-feira' : 'Sábado';
      if (spec.key === 'aniversario_sexta_sabado' && selectedEvent !== eventName) return;
      const synthetic = new Array(headers.length).fill('');
      if (timestampIndex >= 0) synthetic[timestampIndex] = test[0];
      if (nameIndex >= 0) synthetic[nameIndex] = test[3];
      if (groupIndex >= 0) {
        const detail = String(test[7] || '');
        const match = detail.match(/(?:DJ|Influenciador) selecionado: ([^•;]+)/i);
        if (match) synthetic[groupIndex] = match[1].trim();
      }
      if (daysIndex >= 0 && spec.key === 'aniversario_sexta_sabado') synthetic[daysIndex] = selectedEvent;
      if (guestIndex >= 0 && spec.key === 'aniversario_sexta_sabado') {
        const guestMatch = String(test[7] || '').match(/Convidados:\s*(.*?)\s*;\s*Bolo:/);
        synthetic[guestIndex] = guestMatch ? guestMatch[1].split('|').join('\n') : '';
      }
      if (birthDateIndex >= 0 && spec.key === 'aniversario_sexta_sabado') synthetic[birthDateIndex] = new Date(1990, 0, 1);
      vals.push(synthetic);
    });
  }
  vals.forEach(function(row){
    const stamp = timestampIndex >= 0 ? row[timestampIndex] : null;
    if (!(stamp instanceof Date) || stamp < start || stamp > end) return;
    if (spec.key === 'aniversario_sexta_sabado') { const birthdayCutoff = new Date(Utilities.formatDate(end, CONFIG.FUSO_HORARIO, 'yyyy-MM-dd') + 'T13:00:00-03:00'); if (stamp > birthdayCutoff) return; }
    const person = nameIndex >= 0 ? String(row[nameIndex]||'').trim() : '';
    if (!person) return;
    if (spec.key === 'aniversario_sexta_sabado') {
      const daysIndex = headers.findIndex(function(h){return /dia da semana/i.test(h);});
      const dates = daysIndex >= 0 ? String(row[daysIndex]||'') : '';
      const dayLabel = isFridayBirthday ? 'Sexta-feira' : 'Sábado';
      if (dates.indexOf(dayLabel) < 0) return;
      const guestIndex = headers.findIndex(function(h){return /convidados/i.test(h);});
      const guestText = guestIndex >= 0 ? String(row[guestIndex]||'') : '';
      // O briefing limita aniversário a 15 convidados na sexta e 10 no sábado.
      const guestLimit = isFridayBirthday ? 15 : 10;
      const guestNames = guestText.split(/\n|,|;/).map(function(x){return x.trim();}).filter(Boolean).slice(0,guestLimit);
      const birthDateIndex = headers.findIndex(function(h){return /data de nascimento/i.test(h);});
      const birthday = birthDateIndex >= 0 ? row[birthDateIndex] : '';
      const label = person + (birthday instanceof Date ? ' - ' + Utilities.formatDate(birthday, Session.getScriptTimeZone(), 'dd/MM') : '');
      ordered.push({label:label,names:guestNames,numbered:true});
      return;
    }
    const label = groupIndex >= 0 ? String(row[groupIndex]||'').trim() : '';
    const key = flatten ? '__flat__' : (label || 'Sem responsável informado');
    if (!groups[key]) { groups[key] = {label:flatten?'':label,names:[],numbered:true}; ordered.push(groups[key]); }
    groups[key].names.push(person);
  });
  if (!ordered.length) return [{label:'',names:[],numbered:true}];
  if (groupIndex >= 0) {
    const group = grupoOpcao_(spec.key);
    const rank = getOpcoesAtivas_(ss, group);
    ordered.sort(function (a, b) {
      const ai = rank.indexOf(a.label), bi = rank.indexOf(b.label);
      return (ai < 0 ? 9999 : ai) - (bi < 0 ? 9999 : bi);
    });
  }
  return ordered;
}


function grupoOpcao_(key) {
  if (key === 'dj_unificado') return '';
  if (key === 'influencer_unificado') return '';
  if (key === 'dj_sexta') return 'DJ_SEXTA';
  if (key === 'dj_sabado') return 'DJ_SABADO';
  if (key === 'influencer_sexta' || key === 'influencer_sabado') return 'INFLUENCER';
  return '';
}

function isComparativoMoonlight_(ss) {
  const sheet = ss.getSheetByName('Dados de Teste');
  return !!(sheet && sheet.getRange('K1').getDisplayValue() === 'COMPARATIVO_MOONLIGHT');
}

function getOpcoesAtivas_(ss, group) {
  if (!group) return [];
  const sheet = ss.getSheetByName('Configurações') || ss.getSheetByName('Cadastro de Opções');
  if (!sheet || sheet.getLastRow() < 2) return [];
  const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 3).getDisplayValues()
    .filter(function (row) { return row[0] === group && row[1] && row[2].toLowerCase() === 'ativo'; })
    .map(function (row) { return row[1]; });
  return deduplicarOpcoes_(values);
}

function sincronizarOpcoesFormulariosVerdant() {
  const props = PropertiesService.getScriptProperties();
  const spreadsheetId = props.getProperty('spreadsheet_id');
  if (!spreadsheetId) return;
  const ss = SpreadsheetApp.openById(spreadsheetId);
  FORMULARIOS.forEach(function (spec) {
    if (spec.kind === 'unified') return;
    const group = grupoOpcao_(spec.key);
    if (!group || !spec.questions.length) return;
    const id = props.getProperty('form_' + spec.key);
    if (!id) return;
    const choices = getOpcoesAtivas_(ss, group);
    const form = FormApp.openById(id);
    if (!choices.length) {
      form.setAcceptingResponses(false);
      return;
    }
    const title = spec.questions[0].title;
    const item = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE).filter(function (candidate) { return candidate.getTitle() === title; })[0];
    if (item) item.asMultipleChoiceItem().setChoiceValues(choices);
  });
  sincronizarFormulariosUnificadosVerdant_(ss);
}

function instalarGatilhoOpcoes_(ss) {
  const props = PropertiesService.getScriptProperties();
  const spreadsheetId = props.getProperty('spreadsheet_id');
  if (!spreadsheetId) return;
  const exists = ScriptApp.getProjectTriggers().some(function (trigger) { return trigger.getHandlerFunction() === 'aoEditarCadastroOpcoesVerdant_'; });
  if (!exists) ScriptApp.newTrigger('aoEditarCadastroOpcoesVerdant_').forSpreadsheet(ss).onEdit().create();
}

function instalarGatilhoMenuCentralVerdant_(ss) {
  const exists = ScriptApp.getProjectTriggers().some(function (trigger) { return trigger.getHandlerFunction() === 'aoAbrirCentralVerdant_'; });
  if (!exists) ScriptApp.newTrigger('aoAbrirCentralVerdant_').forSpreadsheet(ss).onOpen().create();
}

function aoAbrirCentralVerdant_() {
  SpreadsheetApp.getUi().createMenu('VERDANT')
    .addItem('Aplicar novo visual ao Resumo', 'aplicarTemplateResumoVerdant')
    .addItem('Gerar PDF de portaria…', 'solicitarDataExportacaoVerdant_')
    .addItem('Atualizar Resumo', 'atualizarResumoVerdant_')
    .addToUi();
}

function solicitarDataExportacaoVerdant_() {
  const ui = SpreadsheetApp.getUi();
  const result = ui.prompt('Gerar PDF de portaria', 'Digite a data do evento no formato DD/MM/AAAA. A data deve ser uma sexta-feira ou um sábado.', ui.ButtonSet.OK_CANCEL);
  if (result.getSelectedButton() !== ui.Button.OK) return;
  const match = result.getResponseText().trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) { ui.alert('Data inválida. Digite no formato DD/MM/AAAA, por exemplo 09/10/2026.'); return; }
  const day = Number(match[1]), month = Number(match[2]), year = Number(match[3]);
  const eventDate = new Date(year, month - 1, day, 12, 0, 0);
  if (eventDate.getFullYear() !== year || eventDate.getMonth() !== month - 1 || eventDate.getDate() !== day) { ui.alert('Essa data não existe. Confira dia, mês e ano.'); return; }
  if (eventDate.getDay() !== 5 && eventDate.getDay() !== 6) { ui.alert('A data precisa cair numa sexta-feira ou sábado.'); return; }
  const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('spreadsheet_id'));
  ss.getSheetByName('Exportar Lista').getRange('B3').setValue(eventDate);
  const url = exportarListaVerdantPDF();
  ui.alert('PDF de portaria gerado com sucesso.', 'O arquivo foi salvo na pasta da central.\n' + url, ui.ButtonSet.OK);
}

function aoEditarCadastroOpcoesVerdant_(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  const sheetName = sheet.getName();
  if (sheetName === 'Cadastro DJs') {
    if (e.range.getRow() >= 4 && e.range.getColumn() <= 3) atualizarProgramacaoDJsVerdant_(sheet.getParent());
    return;
  }
  if (sheetName === 'Resumo') {
    if (['B3', 'D3'].indexOf(e.range.getA1Notation()) >= 0) {
      atualizarResumoVerdant_();
      return;
    }
    if (e.range.getColumn() === 5 && e.range.getRow() >= 18 && e.range.getRow() <= 21 && e.value === 'TRUE') {
      executarAcaoResumoVerdant_(e.range.getRow());
    }
    return;
  }
  if (sheetName === 'Agenda de Eventos') {
    const row = e.range.getRow();
    if (row === 2 || row === 3) {
      const expectedDay = row === 2 ? 5 : 6;
      const date = sheet.getRange(row, 2).getValue();
      if (date instanceof Date && Number(Utilities.formatDate(date, CONFIG.FUSO_HORARIO, 'u')) !== expectedDay) {
        sheet.getRange(row, 2).clearContent();
        atualizarJanelaFormulariosVerdant_();
        sheet.getParent().toast(row === 2 ? 'A data da sexta-feira precisa cair numa sexta.' : 'A data do sábado precisa cair num sábado.', 'Agenda de Eventos', 6);
      } else {
        atualizarJanelaFormulariosVerdant_();
      }
    }
    return;
  }
  if (['Configurações', 'Cadastro de Opções'].indexOf(sheetName) < 0) return;
  if (e.range.getRow() < 2 || e.range.getColumn() > 3) return;
  sincronizarOpcoesFormulariosVerdant();
  atualizarJanelaFormulariosVerdant_();
}

function executarAcaoResumoVerdant_(row) {
  const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('spreadsheet_id'));
  const summary = ss.getSheetByName('Resumo');
  const status = summary.getRange('A22');
  try {
    if (row === 18) {
      atualizarResumoVerdant_();
      status.setValue('Resumo atualizado.');
    } else if (row === 19) {
      gerarDadosTesteVerdant();
      status.setValue('Base comparativa Moonlight criada: mesmos totais por lista, com nomes fictícios.');
    } else if (row === 20) {
      limparDadosTesteVerdant();
      status.setValue('Dados fictícios removidos; Lista Única reconstruída com respostas dos formulários.');
    } else if (row === 21) {
      const date = ss.getSheetByName('Exportar Lista').getRange('B3').getValue();
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        status.setValue('Falta a data: preencha Exportar Lista!B3 com uma sexta ou sábado e marque a caixa novamente.');
      } else {
        const url = exportarListaVerdantPDF();
        status.setValue('PDF gerado: ' + url);
      }
    }
  } catch (error) {
    status.setValue('Não foi possível concluir: ' + error.message);
  } finally {
    summary.getRange(row, 5).setValue(false);
  }
}

function instalarGatilhoFormulario_(form) {
  const exists = ScriptApp.getProjectTriggers().some(function (trigger) {
    return trigger.getHandlerFunction() === 'aoEnviarFormularioVerdant_' && trigger.getTriggerSourceId() === form.getId();
  });
  if (!exists) ScriptApp.newTrigger('aoEnviarFormularioVerdant_').forForm(form).onFormSubmit().create();
}

/** Mantém os formulários publicados, mas só aceita respostas na janela semanal definida. */
function instalarGatilhoJanelaFormulariosVerdant_() {
  const triggers = ScriptApp.getProjectTriggers();
  const existing = triggers.filter(function (trigger) { return trigger.getHandlerFunction() === 'atualizarJanelaFormulariosVerdant_'; });
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('window_trigger_version') !== '2') {
    existing.forEach(function (trigger) { ScriptApp.deleteTrigger(trigger); });
    ScriptApp.newTrigger('atualizarJanelaFormulariosVerdant_').timeBased().everyMinutes(1).create();
    props.setProperty('window_trigger_version', '2');
  } else if (!existing.length) {
    ScriptApp.newTrigger('atualizarJanelaFormulariosVerdant_').timeBased().everyMinutes(1).create();
  } else {
    existing.slice(1).forEach(function (trigger) { ScriptApp.deleteTrigger(trigger); });
  }
}

function atualizarJanelaFormulariosVerdant_() {
  const props = PropertiesService.getScriptProperties();
  const spreadsheetId = props.getProperty('spreadsheet_id');
  if (!spreadsheetId) return;
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const dateText = Utilities.formatDate(new Date(), CONFIG.FUSO_HORARIO, 'yyyy-MM-dd');
  const timeText = Utilities.formatDate(new Date(), CONFIG.FUSO_HORARIO, 'HH:mm');
  const now = new Date(dateText + 'T' + timeText + ':00-03:00');
  const weekday = Number(Utilities.formatDate(now, CONFIG.FUSO_HORARIO, 'u')); // 1=segunda, 7=domingo
  const hour = Number(Utilities.formatDate(now, CONFIG.FUSO_HORARIO, 'H'));
  const minute = Number(Utilities.formatDate(now, CONFIG.FUSO_HORARIO, 'm'));
  const afterOpening = weekday > 2 || (weekday === 2 && (hour > 20 || (hour === 20 && minute >= 0)));
  const beforeSeven = hour < 19;
  sincronizarFormulariosUnificadosVerdant_(ss);
  FORMULARIOS.forEach(function (spec) {
    const id = props.getProperty('form_' + spec.key);
    if (!id) return;
    const form = FormApp.openById(id);
    if (spec.kind === 'unified') {
      const openUnified = eventosDisponiveisLista_(ss, spec).length > 0;
      if (form.isAcceptingResponses() !== openUnified) form.setAcceptingResponses(openUnified);
      return;
    }
    let open = false;
    if (afterOpening) {
      if (spec.key === 'pessoas_trans_drag') {
        open = (weekday >= 2 && weekday <= 6) || (weekday === 7 && beforeSeven);
      } else if (spec.key === 'aniversario_sexta_sabado') {
        // O formulário de aniversário fecha às 13h no dia do evento.
        // Como há um formulário para sexta e sábado, permanece aberto até sábado às 13h.
        // O PDF respeita o corte das 13h de cada evento.
        open = weekday >= 2 && (weekday < 6 || (weekday === 6 && hour < 13));
      } else if (/_sexta$/.test(spec.key)) {
        open = weekday >= 2 && (weekday < 5 || (weekday === 5 && beforeSeven));
      } else {
        open = weekday >= 2 && (weekday < 6 || (weekday === 6 && beforeSeven));
      }
    }
    const group = grupoOpcao_(spec.key);
    if (group && ss && !getOpcoesAtivas_(ss, group).length) open = false;
    if (form.isAcceptingResponses() !== open) form.setAcceptingResponses(open);
  });
}

function aoEnviarFormularioVerdant_(e) {
  if (!e || !e.source || !e.response) return;
  const formId = e.source.getId();
  const spec = FORMULARIOS.filter(function (item) { return PropertiesService.getScriptProperties().getProperty('form_' + item.key) === formId; })[0];
  if (!spec) return;
  const answers = {};
  e.response.getItemResponses().forEach(function (itemResponse) {
    let answer = itemResponse.getResponse();
    if (Array.isArray(answer)) answer = answer.join(', ');
    answers[itemResponse.getItem().getTitle()] = answer;
  });
  answers['E-mail'] = e.response.getRespondentEmail() || '';
  if (spec.key === 'aniversario_sexta_sabado' && !respostaAniversarioNoPrazo_(answers, e.response.getTimestamp())) return;
  registrarRespostaNaListaUnica_(spec, e.response, answers);
  const consent = String(answers[ACEITE_NOVIDADES] || '');
  if (consent.indexOf('Sim, aceito receber novidades.') < 0) return;
  const responseId = e.response.getId() || Utilities.getUuid();
  const props = PropertiesService.getScriptProperties();
  const dedupeKey = 'exported_response_' + responseId;
  if (props.getProperty(dedupeKey)) return;
  const ss = SpreadsheetApp.openById(props.getProperty('spreadsheet_id'));
  const sheet = ss.getSheetByName('Exportar Meta');
  const phone = normalizarTelefoneBr_(answers['Telefone/WhatsApp com DDD']);
  sheet.appendRow([e.response.getTimestamp(), answers['Nome completo, conforme consta no documento'] || '', phone, answers['E-mail'] || '', spec.title, consent, responseId]);
  props.setProperty(dedupeKey, '1');
  atualizarResumoVerdant_();
}

function respostaAniversarioNoPrazo_(answers, timestamp) {
  const selected = String(Object.keys(answers).filter(function (key) { return /dia da semana/i.test(key); }).map(function (key) { return answers[key]; }).join(' '));
  const day = selected.indexOf('Sexta-feira') >= 0 ? 5 : selected.indexOf('Sábado') >= 0 ? 6 : 0;
  if (!day) return false;
  return aniversarioDentroDoPrazo_(day, timestamp);
}

function aniversarioDentroDoPrazo_(eventDay, timestamp) {
  const dateText = Utilities.formatDate(timestamp, CONFIG.FUSO_HORARIO, 'yyyy-MM-dd');
  const [year, month, date] = dateText.split('-').map(Number);
  const weekday = Number(Utilities.formatDate(timestamp, CONFIG.FUSO_HORARIO, 'u'));
  const delta = eventDay - weekday; // dia anterior se a resposta chegou depois do evento
  const eventDate = new Date(Date.UTC(year, month - 1, date + delta, 12));
  const eventText = Utilities.formatDate(eventDate, CONFIG.FUSO_HORARIO, 'yyyy-MM-dd');
  const cutoff = new Date(eventText + 'T13:00:00-03:00');
  return timestamp <= cutoff;
}

function normalizarTelefoneBr_(value) {
  const original = String(value || '').trim();
  const digits = original.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.indexOf('55') === 0) return '+' + digits;
  if (digits.length === 10 || digits.length === 11) return '+55' + digits;
  return original;
}

function prepararResumoVerdant_(sheet) {
  const choices = ['Todos', 'Sexta-feira', 'Sábado', 'Variável'];
  const categories = ['Todas'].concat(FORMULARIOS.filter(function (spec) { return spec.summary !== false; }).map(function (spec) { return categoriaLista_(spec.key); }));
  sheet.clearContents();
  sheet.getCharts().forEach(function (chart) { sheet.removeChart(chart); });
  sheet.getImages().forEach(function (image) { image.remove(); });
  sheet.getRange('A1').setValue('VERDANT | CENTRAL DE LISTAS E LEADS');
  sheet.getRange('A2').setValue('Use os filtros para consultar inscrições por evento e categoria. Os dados completos ficam na aba Lista Única.');
  sheet.getRange('A3:D3').setValues([['EVENTO', 'Todos', 'CATEGORIA', 'Todas']]);
  sheet.getRange('A4:F4').setValues([['PESSOAS NAS LISTAS', 'ACEITES DE NOVIDADES', 'DJS ATIVOS CADASTRADOS', 'INFLUENCERS ATIVOS CADASTRADOS', 'LISTAS COM INSCRITOS', 'CONSUMAÇÃO ESTIMADA (VALORES FIXOS)']]);
  sheet.getRange('A7:F7').setValues([['Categoria', 'Pessoas', 'Aceites', 'Lista / horário', 'Consumação por pessoa', 'Consumação estimada']]);
  sheet.getRange('B3').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(choices, true).build());
  sheet.getRange('D3').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(categories, true).build());
  sheet.getRange('B3').setValue('Todos'); sheet.getRange('D3').setValue('Todas');
  prepararAcoesResumoVerdant_(sheet);
  sheet.insertImage(obterLogoVerdant_(), 7, 1).setWidth(128).setHeight(75).setAltTextTitle('Logo Verdant');
  sheet.setFrozenRows(7);
  estilizarAbaResumo_(sheet);
}

function prepararAcoesResumoVerdant_(sheet) {
  sheet.getRange('A17:F17').breakApart().merge().setValue('AÇÕES RÁPIDAS  •  marque a caixa à direita para executar');
  const labels = ['Atualizar Resumo', 'Gerar base comparativa Moonlight (sábado)', 'Remover registros fictícios de teste', 'Gerar PDF de portaria (informe a data em Exportar Lista!B3)'];
  labels.forEach(function (label, index) {
    const row = 18 + index;
    sheet.getRange(row, 1, 1, 4).breakApart().merge().setValue(label);
    sheet.setRowHeight(row, 34);
  });
  sheet.getRange('E18:E21').insertCheckboxes().setValue(false);
  sheet.getRange('A22:F22').breakApart().merge().setValue('Pronto para executar. Gere a base comparativa para testar o PDF; informe a data do evento em Exportar Lista!B3.');
}

function atualizarResumoVerdant_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('spreadsheet_id');
  if (!id) return;
  const ss = SpreadsheetApp.openById(id);
  const summary = ss.getSheetByName('Resumo');
  if (!summary) return;
  const data = ss.getSheetByName('Lista Única');
  const records = data && data.getLastRow() > 1 ? data.getRange(2, 1, data.getLastRow() - 1, 10).getValues() : [];
  const eventFilter = summary.getRange('B3').getDisplayValue() || 'Todos';
  const categoryFilter = summary.getRange('D3').getDisplayValue() || 'Todas';
  const categoryRows = FORMULARIOS.filter(function (spec) { return spec.summary !== false; }).map(function (spec) {
    const category = categoriaLista_(spec.key);
    const event = eventoLista_(spec.key);
    const relevant = records.filter(function (row) {
      if (row[2] !== category) return false;
      if (categoryFilter !== 'Todas' && categoryFilter !== category) return false;
      if (eventFilter !== 'Todos' && String(row[1] || '').indexOf(eventFilter) < 0) return false;
      return true;
    });
    const accepted = relevant.filter(function (row) { return String(row[6] || '').indexOf('Sim, aceito receber novidades.') >= 0; }).length;
    const people = spec.key === 'aniversario_sexta_sabado'
      ? relevant.reduce(function (sum, row) { return sum + contarConvidadosResumo_(row[7], row[1]); }, 0)
      : relevant.length;
    let hasDefinedPrice = false;
    const estimateTotal = relevant.reduce(function (sum, row) {
      const price = valorUnitarioRegistroResumo_(spec.key, String(row[1] || ''));
      const count = spec.key === 'aniversario_sexta_sabado' ? contarConvidadosResumo_(row[7], row[1]) : 1;
      if (price != null) hasDefinedPrice = true;
      return price == null ? sum : sum + price * count;
    }, 0);
    const estimate = hasDefinedPrice || !relevant.length ? estimateTotal : '';
    return [category, people, accepted, event + ' • ' + regraResumo_(spec.key), rotuloValorListaResumo_(spec.key, eventFilter), estimate];
  });
  summary.getRange(8, 1, categoryRows.length, 6).setValues(categoryRows);
  summary.getRange('A16:F16').setValues([[
    'TOTAL DO FILTRO',
    categoryRows.reduce(function (sum, row) { return sum + row[1]; }, 0),
    categoryRows.reduce(function (sum, row) { return sum + row[2]; }, 0),
    '', '',
    categoryRows.reduce(function (sum, row) { return sum + (typeof row[5] === 'number' ? row[5] : 0); }, 0)
  ]]);
  const visible = categoryRows.filter(function (row) { return row[1] > 0; });
  const options = ss.getSheetByName('Configurações');
  const configs = options && options.getLastRow() > 1 ? options.getRange(2, 1, options.getLastRow() - 1, 3).getDisplayValues() : [];
  const djs = configs.filter(function (row) { return /^DJ/.test(row[0]) && row[2].toLowerCase() === 'ativo'; }).length;
  const influencers = configs.filter(function (row) { return /INFLUENCER/i.test(row[0]) && row[2].toLowerCase() === 'ativo'; }).length;
  summary.getRange('A5:F5').setValues([[visible.reduce(function (sum, row) { return sum + row[1]; }, 0), visible.reduce(function (sum, row) { return sum + row[2]; }, 0), djs, influencers, visible.length, visible.reduce(function (sum, row) { return sum + (typeof row[5] === 'number' ? row[5] : 0); }, 0)]]);
  summary.getRange('F5').setNumberFormat('"R$" #,##0.00');
  summary.getRange(8, 6, categoryRows.length, 1).setNumberFormat('"R$" #,##0.00');
  summary.getRange('F16').setNumberFormat('"R$" #,##0.00');
  estilizarAbaResumo_(summary);
  atualizarGraficosResumoVerdant_(summary);
}

function atualizarGraficosResumoVerdant_(sheet) {
  sheet.getCharts().forEach(function (chart) { sheet.removeChart(chart); });
  const peopleChart = sheet.newChart().asBarChart()
    .addRange(sheet.getRange('A7:B15')).setNumHeaders(1)
    .setOption('title', 'Pessoas por lista')
    .setOption('legend', {position: 'none'})
    .setOption('colors', ['#64C082'])
    .setOption('backgroundColor', '#FFFFFF')
    .setOption('width', 560).setOption('height', 350)
    .setPosition(4, 8, 0, 0).build();
  const valueChart = sheet.newChart().asColumnChart()
    .addRange(sheet.getRange('A7:A15')).addRange(sheet.getRange('F7:F15')).setNumHeaders(1)
    .setOption('title', 'Consumação estimada por lista')
    .setOption('legend', {position: 'none'})
    .setOption('colors', ['#568CC9'])
    .setOption('backgroundColor', '#FFFFFF')
    .setOption('width', 560).setOption('height', 350)
    .setPosition(4, 14, 0, 0).build();
  sheet.insertChart(peopleChart);
  sheet.insertChart(valueChart);
}

/** Aplica o novo layout somente à aba Resumo, preservando formulários e respostas. */
function aplicarTemplateResumoVerdant() {
  const id = PropertiesService.getScriptProperties().getProperty('spreadsheet_id');
  if (!id) throw new Error('Execute criarFormulariosVerdant() primeiro para vincular esta planilha.');
  const ss = SpreadsheetApp.openById(id);
  const summary = getOrCreateSheet_(ss, 'Resumo');
  prepararResumoVerdant_(summary);
  atualizarResumoVerdant_();
  ss.setActiveSheet(summary);
  SpreadsheetApp.flush();
  Logger.log('Novo visual aplicado à aba Resumo.');
}

function contarConvidadosResumo_(details, event) {
  const match = String(details || '').match(/convidados[^:]*:\s*(.*?)(?:(?:;\s*Bolo:)|(?:\s*\|\s*Você vai levar)|$)/i);
  if (!match) return 0;
  const limit = /sexta-feira/i.test(String(event || '')) ? 15 : 10;
  return match[1].split(/\||\n|,|;/).map(function (name) { return name.trim(); }).filter(Boolean).slice(0, limit).length;
}

function valorUnitarioRegistroResumo_(key, event) {
  if (key === 'dj_sexta' || key === 'influencer_sexta') return 30;
  if (key === 'dj_sabado' || key === 'influencer_sabado') return 60;
  if (key === 'lista_amiga_sabado' || key === 'canal_lover_sabado') return 70;
  if (key === 'aniversario_sexta_sabado') return /sábado/i.test(event) ? 50 : null;
  if (key === 'pessoas_trans_drag') return 0;
  return null;
}

function rotuloValorListaResumo_(key, eventFilter) {
  if (key === 'dj_sexta' || key === 'influencer_sexta') return 'R$ 30,00';
  if (key === 'dj_sabado' || key === 'influencer_sabado') return 'R$ 60,00';
  if (key === 'lista_amiga_sabado' || key === 'canal_lover_sabado') return 'R$ 70,00';
  if (key === 'aniversario_sexta_sabado') return eventFilter === 'Sábado' ? 'R$ 50,00' : eventFilter === 'Sexta-feira' ? 'Portaria variável' : 'Sáb. R$ 50,00 / Sex. variável';
  if (key === 'pessoas_trans_drag') return 'Gratuita';
  return '—';
}

function aoAlterarFiltroResumoVerdant_(e) {
  if (!e || !e.range || e.range.getSheet().getName() !== 'Resumo') return;
  if (['B3', 'D3'].indexOf(e.range.getA1Notation()) >= 0) atualizarResumoVerdant_();
}

function categoriaLista_(key) {
  const map = {dj_unificado:'DJs', influencer_unificado:'Influencers',dj_sexta:'DJs — Sexta', influencer_sexta:'Influencers — Sexta', lista_amiga_sabado:'Lista Lovers — Sábado', canal_lover_sabado:'Canal Lover — Sábado', dj_sabado:'DJs — Sábado', influencer_sabado:'Influencers — Sábado', aniversario_sexta_sabado:'Aniversário', pessoas_trans_drag:'VIP'};
  return map[key] || key;
}

function eventoLista_(key) {
  if (/_sexta/.test(key) || key === 'dj_sexta' || key === 'influencer_sexta') return 'Sexta-feira';
  if (/_sabado/.test(key) || key === 'lista_amiga_sabado' || key === 'canal_lover_sabado' || key === 'dj_sabado' || key === 'influencer_sabado') return 'Sábado';
  if (key === 'aniversario_sexta_sabado') return 'Dia não identificado';
  if (key === 'pessoas_trans_drag') return 'Variável';
  return 'Sexta-feira / Sábado';
}

function regraResumo_(key) {
  const s = FORMULARIOS.filter(function (x) { return x.key === key; })[0];
  return s ? s.title.replace(/^Lista(s)? /, '') : '';
}

function reconstruirListaUnicaVerdant_(ss) {
  const sheet = ss.getSheetByName('Lista Única');
  if (!sheet) return;
  if (sheet.getLastRow() > 1) sheet.getRange(2, 1, sheet.getLastRow() - 1, 10).clearContent();
  const props = PropertiesService.getScriptProperties();
  const out = [];
  FORMULARIOS.forEach(function (spec) {
    const response = ss.getSheetByName(spec.responseSheet);
    if (!response || response.getLastRow() < 2) return;
    const width = response.getLastColumn();
    const headers = response.getRange(1, 1, 1, width).getDisplayValues()[0];
    response.getRange(2, 1, response.getLastRow() - 1, width).getValues().forEach(function (row, idx) {
      const record = mapearLinhaResposta_(spec, headers, row, idx + 2);
      if (record) out.push(record);
    });
  });
  const testSheet = ss.getSheetByName('Dados de Teste');
  if (testSheet && testSheet.getLastRow() > 1) {
    testSheet.getRange(2, 1, testSheet.getLastRow() - 1, 10).getValues().forEach(function (row) {
      if (row[9] && String(row[9]).indexOf('TESTE-') === 0) out.push(row);
    });
  }
  if (out.length) sheet.getRange(2, 1, out.length, 10).setValues(out);
  atualizarResumoVerdant_();
}

/** Cria nomes fictícios para comparar o PDF de sábado com as quantidades do Moonlight 03.10. */
function gerarDadosTesteVerdant() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('spreadsheet_id');
  if (!id) throw new Error('Execute criarFormulariosVerdant() primeiro para localizar a central.');
  const ss = SpreadsheetApp.openById(id);
  garantirDJsTesteVerdant_(ss);
  let sheet = ss.getSheetByName('Dados de Teste');
  if (!sheet) sheet = ss.insertSheet('Dados de Teste');
  const headers = ['Data/hora', 'Evento', 'Categoria', 'Nome completo', 'Telefone/WhatsApp', 'E-mail', 'Aceite de novidades', 'Detalhes específicos', 'Formulário de origem', 'ID da resposta'];
  const rows = [];
  const firstNames = ['Alex', 'Beatriz', 'Caio', 'Dandara', 'Enzo', 'Fernanda', 'Gabriel', 'Helena', 'Ícaro', 'Júlia', 'Kaique', 'Larissa', 'Marina', 'Nicolas', 'Olívia', 'Pedro', 'Rafaela', 'Samuel', 'Tainá', 'Vitor'];
  const lastNames = ['Almeida', 'Barbosa', 'Cardoso', 'Dias', 'Esteves', 'Ferreira', 'Gomes', 'Henrique', 'Ibrahim', 'Jardim', 'Klein', 'Lima', 'Mendes', 'Nogueira', 'Oliveira', 'Prado', 'Queiroz', 'Ramos', 'Silva', 'Teixeira'];
  const demoDates = datasDemoDJsVerdant_();
  const optionDistribution = {
    influencer_sabado: {'Alee Ribas':16, 'Ana Paula':16, 'Eduardo Lima':6, 'Elias Forteski':35, 'Elison Garcia':12, 'Mônica Ortiz':8, 'Well Brunini':26},
    dj_sabado: {'Allan Natal':1, 'Anderson Zabroski':44, 'Andre Gazza':8, 'Dubiong':14, 'Duda Mehel':4, 'Fredo Silva':13, 'Lucas Franco':1, 'Má Rodrigues':11, 'Mau Perin':9, 'Ramon':1, 'Wagner Mauricio':29}
  };
  const comparisonCounts = {
    influencer_sabado:119,
    aniversario_sexta_sabado:101,
    dj_sabado:135,
    canal_lover_sabado:56,
    lista_amiga_sabado:346
  };
  const eventDate = demoDates.saturday;
  const exportSheet = getOrCreateSheet_(ss, 'Exportar Lista');
  prepararAbaExportarLista_(exportSheet);
  exportSheet.getRange('B3').setValue(eventDate).setNumberFormat('dd/mm/yyyy');
  let serial = 0;
  Object.keys(comparisonCounts).forEach(function (key, index) {
    const spec = FORMULARIOS.filter(function (item) { return item.key === key; })[0];
    const category = categoriaLista_(key);
    const isBirthday = key === 'aniversario_sexta_sabado';
    const entryCount = isBirthday ? Math.ceil(comparisonCounts[key] / 10) : comparisonCounts[key];
    const optionSchedule = [];
    Object.keys(optionDistribution[key] || {}).forEach(function (option) {
      for (let n = 0; n < optionDistribution[key][option]; n++) optionSchedule.push(option);
    });
    for (let i = 0; i < entryCount; i++) {
      serial++;
      const name = firstNames[i % firstNames.length] + ' ' + lastNames[(i + index) % lastNames.length] + ' TESTE ' + String(i + 1).padStart(3, '0');
      let details = 'Registro fictício para comparação visual';
      if (optionSchedule.length) details = (key.indexOf('dj_') === 0 ? 'DJ selecionado: ' : 'Influenciador selecionado: ') + optionSchedule[i] + ' • ' + details;
      if (isBirthday) {
        const guestStart = i * 10;
        const guestCount = Math.min(10, comparisonCounts[key] - guestStart);
        const guests = [];
        for (let g = 0; g < guestCount; g++) guests.push('Convidado Teste ' + String(guestStart + g + 1).padStart(3, '0'));
        details = 'Data de nascimento: 01/01/1990; Dia escolhido: Sábado; Convidados: ' + guests.join('|') + '; Bolo: Não • Registro fictício';
      } else if (key === 'lista_amiga_sabado' || key === 'canal_lover_sabado') {
        details = 'Categoria: ' + (key === 'lista_amiga_sabado' ? 'Lista Amiga' : 'Canal Lover') + ' • Registro fictício';
      }
      const stamp = timestampDemoVerdant_(eventDate, serial - 1);
      rows.push([stamp, 'Sábado', category, name, '+55119999' + String(100000 + serial), 'teste' + serial + '@exemplo.invalid', 'Sim, aceito receber novidades.', details, spec.title + ' (TESTE MOONLIGHT)', 'TESTE-' + key + '-' + String(i + 1).padStart(3, '0')]);
    }
  });
  sheet.clearContents();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange('K1').setValue('COMPARATIVO_MOONLIGHT');
  if (rows.length) sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  estilizarCabecalho_(sheet, 1, headers.length);
  sheet.setFrozenRows(1);
  sheet.setTabColor('#F4B400');
  sheet.setColumnWidths(1, 1, 155); sheet.setColumnWidths(2, 3, 180); sheet.setColumnWidth(8, 420); sheet.setColumnWidth(9, 270);
  atualizarProgramacaoDJsVerdant_(ss);
  reconstruirListaUnicaVerdant_(ss);
  ss.setActiveSheet(ss.getSheetByName('Resumo'));
  SpreadsheetApp.flush();
  Logger.log('Base comparativa criada: Influencers 119; Aniversário 101 convidados; DJs 135; Canal Lover 56; Lista Amiga 346. VIP: 7 nomes da configuração. Registros fictícios: ' + rows.length + '. Remova com limparDadosTesteVerdant().');
}

/** Remove só a base fictícia de teste e reconstrói Lista Única com respostas reais. */
function limparDadosTesteVerdant() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('spreadsheet_id');
  if (!id) throw new Error('Execute criarFormulariosVerdant() primeiro para localizar a central.');
  const ss = SpreadsheetApp.openById(id);
  const testSheet = ss.getSheetByName('Dados de Teste');
  if (testSheet) ss.deleteSheet(testSheet);
  const djs = ss.getSheetByName('Cadastro DJs');
  if (djs && djs.getLastRow() >= 4) {
    const values = djs.getRange(4, 1, djs.getLastRow() - 3, 3).getValues();
    values.forEach(function (row, index) {
      if (/^\[TESTE\]/.test(String(row[1] || ''))) djs.getRange(index + 4, 1, 1, 3).clearContent();
    });
  }
  atualizarProgramacaoDJsVerdant_(ss);
  reconstruirListaUnicaVerdant_(ss);
}

function garantirDJsTesteVerdant_(ss) {
  const sheet = ss.getSheetByName('Cadastro DJs');
  if (!sheet) return;
  const last = sheet.getLastRow();
  const current = last >= 4 ? sheet.getRange(4, 1, last - 3, 3).getValues() : [];
  if (current.some(function (row) { return /^\[TESTE\]/.test(String(row[1] || '')); })) return;
  const dates = datasDemoDJsVerdant_();
  const rows = [];
  for (let i = 0; i < 20; i++) rows.push([i < 10 ? dates.friday : dates.saturday, '[TESTE] DJ ' + String(i + 1).padStart(2, '0'), i % 2 ? 'Pista LAND' : 'Pista SKY']);
  sheet.getRange(Math.max(last + 1, 4), 1, rows.length, 3).setValues(rows);
  atualizarProgramacaoDJsVerdant_(ss);
}

function timestampDemoVerdant_(eventDate, index) {
  const dateText = Utilities.formatDate(eventDate, CONFIG.FUSO_HORARIO, 'yyyy-MM-dd');
  const [year, month, day] = dateText.split('-').map(Number);
  const eventWeekday = new Date(Date.UTC(year, month - 1, day, 12)).getUTCDay();
  const daysBeforeTuesday = (eventWeekday - 2 + 7) % 7;
  const tue = new Date(Date.UTC(year, month - 1, day - daysBeforeTuesday, 12));
  const tueText = Utilities.formatDate(tue, CONFIG.FUSO_HORARIO, 'yyyy-MM-dd');
  return new Date(new Date(tueText + 'T20:00:00-03:00').getTime() + index * 60000);
}

function registrarRespostaNaListaUnica_(spec, response, answers) {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('spreadsheet_id');
  if (!id) return;
  const responseId = response.getId() || Utilities.getUuid();
  const ss = SpreadsheetApp.openById(id);
  const sheet = ss.getSheetByName('Lista Única');
  if (!sheet) return;
  if (sheet.getLastRow() > 1 && sheet.getRange(2, 10, sheet.getLastRow() - 1, 1).getDisplayValues().some(function (r) { return r[0] === responseId; })) return;
  const details = [];
  response.getItemResponses().forEach(function (item) {
    const title = item.getItem().getTitle();
    if ([ACEITE_NOVIDADES, 'Nome completo, conforme consta no documento', 'Telefone/WhatsApp com DDD', 'E-mail'].indexOf(title) >= 0) return;
    let answer = item.getResponse();
    if (Array.isArray(answer)) answer = answer.join(', ');
    if (answer !== '' && answer != null) details.push(title + ': ' + answer);
  });
  sheet.appendRow([response.getTimestamp(), eventoDaResposta_(spec, answers), categoriaDaResposta_(spec, answers), answers['Nome completo, conforme consta no documento'] || '', answers['Telefone/WhatsApp com DDD'] || '', answers['E-mail'] || '', answers[ACEITE_NOVIDADES] || '', details.join(' | '), spec.title, responseId]);
  atualizarResumoVerdant_();
}

function eventoDaResposta_(spec, answers) {
  if (spec.kind === 'unified') return diaDaEscolhaEvento_(answers['Selecione o evento']);
  if (spec.key !== 'aniversario_sexta_sabado') return eventoLista_(spec.key);
  const selected = Object.keys(answers).filter(function (key) { return /dia da semana/i.test(key); }).map(function (key) { return String(answers[key] || ''); }).join(', ');
  const days = [];
  if (selected.indexOf('Sexta-feira') >= 0) days.push('Sexta-feira');
  if (selected.indexOf('Sábado') >= 0) days.push('Sábado');
  return days.join(' / ') || 'Dia não identificado';
}

function eventoDaLinha_(spec, headers, row) {
  if (spec.kind === 'unified') { const i = headers.findIndex(function(h){return h === 'Selecione o evento';}); return diaDaEscolhaEvento_(i >= 0 ? row[i] : ''); }
  if (spec.key !== 'aniversario_sexta_sabado') return eventoLista_(spec.key);
  const i = headers.findIndex(function (h) { return /dia da semana/i.test(h); });
  const value = i >= 0 ? String(row[i] || '') : '';
  const days = [];
  if (value.indexOf('Sexta-feira') >= 0) days.push('Sexta-feira');
  if (value.indexOf('Sábado') >= 0) days.push('Sábado');
  return days.join(' / ') || 'Dia não identificado';
}

function mapearLinhaResposta_(spec, headers, row, rowNumber) {
  const get = function (rx) { const i = headers.findIndex(function (h) { return rx.test(h); }); return i >= 0 ? row[i] : ''; };
  const timestamp = get(/carimbo de data|timestamp/i);
  const name = get(/nome completo/i);
  if (!(timestamp instanceof Date) || !name) return null;
  if (spec.key === 'aniversario_sexta_sabado') {
    const dayText = String(eventoDaLinha_(spec, headers, row));
    const selectedDay = /sexta-feira/i.test(dayText) ? 5 : /sábado/i.test(dayText) ? 6 : 0;
    if (selectedDay && !aniversarioDentroDoPrazo_(selectedDay, timestamp)) return null;
  }
  const details = [];
  headers.forEach(function (h, i) {
    if (!h || h === ACEITE_NOVIDADES || /carimbo de data|timestamp|nome completo|telefone|whatsapp|e-?mail|endereço de e-mail/i.test(h)) return;
    if (row[i] !== '' && row[i] != null) details.push(h + ': ' + row[i]);
  });
  const responseId = 'IMPORT-' + spec.key + '-' + rowNumber;
  const consentIndex = headers.indexOf(ACEITE_NOVIDADES);
  return [timestamp, eventoDaLinha_(spec, headers, row), categoriaDaLinha_(spec, headers, row), name, get(/telefone|whatsapp/i), get(/e-?mail|endereço de e-mail/i), consentIndex >= 0 ? row[consentIndex] : '', details.join(' | '), spec.title, responseId];
}

function diaDaEscolhaEvento_(value) {
  const text = String(value || '');
  if (/^sexta-feira/i.test(text)) return 'Sexta-feira';
  if (/^sábado/i.test(text)) return 'Sábado';
  return '';
}

function categoriaDaResposta_(spec, answers) {
  if (spec.kind !== 'unified') return categoriaLista_(spec.key);
  const day = diaDaEscolhaEvento_(answers['Selecione o evento']);
  if (spec.role === 'DJ') return day === 'Sábado' ? categoriaLista_('dj_sabado') : categoriaLista_('dj_sexta');
  return day === 'Sábado' ? categoriaLista_('influencer_sabado') : categoriaLista_('influencer_sexta');
}

function categoriaDaLinha_(spec, headers, row) {
  if (spec.kind !== 'unified') return categoriaLista_(spec.key);
  const i = headers.findIndex(function(h){return h === 'Selecione o evento';});
  const day = diaDaEscolhaEvento_(i >= 0 ? row[i] : '');
  if (spec.role === 'DJ') return day === 'Sábado' ? categoriaLista_('dj_sabado') : categoriaLista_('dj_sexta');
  return day === 'Sábado' ? categoriaLista_('influencer_sabado') : categoriaLista_('influencer_sexta');
}

function numeroColunaParaLetra_(column) {
  let n = column;
  let result = '';
  while (n > 0) {
    const remainder = (n - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    n = Math.floor((n - 1) / 26);
  }
  return result;
}


// ===== Painel Web Verdant =====
/**
 * VERDANT | backend do painel web
 * Adicione este arquivo ao mesmo projeto Apps Script da central e adicione Index.html.
 * Privacidade: mantenha a implantação restrita à proprietária. A checagem abaixo
 * também restringe os dados à conta proprietária conhecida do projeto.
 */

const VERDANT_WEBAPP_OWNER_EMAIL = 'gdo.brunno@gmail.com';
const VERDANT_WEBAPP_TZ = 'America/Sao_Paulo';

function doGet() {
  verdantWebAppAuthorize_();
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Central de Listas | Verdant')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getDashboardData() {
  verdantWebAppAuthorize_();
  const ss = verdantWebAppSpreadsheet_();
  const list = ss.getSheetByName('Lista Única');
  const records = verdantWebAppRows_(list, 10);
  const categories = {};
  let consents = 0;
  records.forEach(function (r) {
    const category = String(r[2] || 'Sem categoria');
    categories[category] = (categories[category] || 0) + 1;
    if (/sim, aceito receber novidades/i.test(String(r[6] || ''))) consents++;
  });

  const config = ss.getSheetByName('Configurações');
  const configRows = verdantWebAppRows_(config, 3);
  const djNames = {};
  configRows.forEach(function (r) {
    if (!/^DJ(?:_|\b)/i.test(String(r[0] || '')) || !/^ativo$/i.test(String(r[2] || ''))) return;
    const name = String(r[1] || '').trim();
    const key = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
    if (key) djNames[key] = true;
  });
  const activeDjs = Object.keys(djNames).length;
  let activeForms = 0;
  const props = PropertiesService.getScriptProperties();
  FORMULARIOS.forEach(function (spec) {
    const id = props.getProperty('form_' + spec.key);
    if (!id) return;
    try { if (FormApp.openById(id).isAcceptingResponses()) activeForms++; } catch (e) {}
  });
  const eventDates = verdantWebAppEventDates_(ss);

  return {
    updatedAt: Utilities.formatDate(new Date(), VERDANT_WEBAPP_TZ, 'dd/MM/yyyy HH:mm'),
    metrics: {
      totalResponses: records.length,
      marketingConsent: consents,
      consentRate: records.length ? Math.round(consents * 100 / records.length) : 0,
      activeDjs: activeDjs,
      activeForms: activeForms
    },
    categories: Object.keys(categories).sort().map(function (label) { return {label: label, count: categories[label]}; }),
    eventDates: eventDates
  };
}

function getEventList(dateValue) {
  verdantWebAppAuthorize_();
  const ss = verdantWebAppSpreadsheet_();
  const date = verdantWebAppParseDate_(dateValue);
  const eventInfo = verdantWebAppEventForDate_(ss, date);
  if (!eventInfo) throw new Error('A data precisa estar cadastrada na aba Agenda de Eventos como sexta ou sábado.');
  const records = verdantWebAppRows_(ss.getSheetByName('Lista Única'), 10);
  const from = new Date(date.getTime());
  from.setDate(from.getDate() - (eventInfo.day === 5 ? 3 : 4));
  from.setHours(20, 0, 0, 0);
  const until = new Date(date.getTime());
  until.setHours(19, 0, 0, 0);
  let skipped = 0;
  const rows = records.filter(function (r) {
    const timestamp = r[0] instanceof Date ? r[0] : new Date(r[0]);
    if (!r[0] || isNaN(timestamp.getTime())) { skipped++; return false; }
    const day = String(r[1] || '');
    const wanted = eventInfo.day === 5 ? /sexta-feira/i : /sábado|sabado/i;
    if (!(timestamp >= from && timestamp <= until && wanted.test(day))) return false;
    if (String(r[2] || '') === 'Aniversário' && timestamp > new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0)) return false;
    return true;
  }).map(function (r) {
    return {name: String(r[3] || 'Nome não informado'), type: String(r[2] || 'Lista')};
  });
  rows.sort(function (a, b) { return a.name.localeCompare(b.name, 'pt-BR'); });
  return {rows: rows, source: 'Lista Única • ' + eventInfo.label + ' • ' + Utilities.formatDate(date, VERDANT_WEBAPP_TZ, 'dd/MM/yyyy'), skippedWithoutDate: skipped};
}

function exportEventPdf(dateValue) {
  verdantWebAppAuthorize_();
  const ss = verdantWebAppSpreadsheet_();
  const date = verdantWebAppParseDate_(dateValue);
  const eventInfo = verdantWebAppEventForDate_(ss, date);
  if (!eventInfo) throw new Error('A data precisa estar cadastrada na aba Agenda de Eventos como sexta ou sábado.');
  const start = new Date(date.getTime()); start.setDate(start.getDate() - (eventInfo.day === 5 ? 3 : 4)); start.setHours(20, 0, 0, 0);
  const end = new Date(date.getTime()); end.setHours(19, 0, 0, 0);
  const sections = montarSecoesLista_(ss, start, end, eventInfo.day);
  const count = sections.reduce(function (n, section) { return n + section.groups.reduce(function (m, group) { return m + group.names.length; }, 0); }, 0);
  const filename = 'Verdant_Portaria_' + Utilities.formatDate(date, VERDANT_WEBAPP_TZ, 'yyyy-MM-dd') + '.pdf';
  return verdantWebAppPdf_(filename, sections, count);
}

function exportConsentLeadsPdf() {
  verdantWebAppAuthorize_();
  const ss = verdantWebAppSpreadsheet_();
  const sheet = ss.getSheetByName('Exportar Meta');
  const source = verdantWebAppRows_(sheet, 7);
  const names = [];
  let count = 0;
  source.forEach(function (r) {
    if (!/sim, aceito receber novidades/i.test(String(r[5] || ''))) return;
    count++;
    names.push((count) + '. ' + [r[1], r[2], r[3], r[4], r[0] instanceof Date ? Utilities.formatDate(r[0], VERDANT_WEBAPP_TZ, 'dd/MM/yyyy') : r[0]].filter(Boolean).join(' • '));
  });
  return verdantWebAppPdf_('Verdant_Leads_com_Opt-in.pdf', [{title:'CONTATOS COM AUTORIZAÇÃO PARA NOVIDADES', groups:[{names:names, numbered:false}]}], count);
}

function exportActiveDjsPdf() {
  verdantWebAppAuthorize_();
  const ss = verdantWebAppSpreadsheet_();
  const source = verdantWebAppRows_(ss.getSheetByName('Configurações'), 3);
  const byName = {};
  source.forEach(function (r) {
    if (!/^DJ(?:_|\b)/i.test(String(r[0] || '')) || !/^ativo$/i.test(String(r[2] || ''))) return;
    const name = String(r[1] || '').trim();
    const key = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
    if (key) byName[key] = name;
  });
  const names = Object.keys(byName).map(function (key) { return byName[key]; }).sort(function (a,b) { return a.localeCompare(b,'pt-BR'); });
  return verdantWebAppPdf_('Verdant_DJs_ativos.pdf', [{title:'DJs ATIVOS', groups:[{names:names,numbered:true}]}], names.length);
}

function verdantWebAppPdf_(filename, sections, count) {
  const title = filename.replace(/\.pdf$/i, '').replace(/_/g, ' ');
  const blob = verdantCriarPdfTimbrado_(title, sections, false);
  return {filename:filename, mimeType:'application/pdf', count:count, data:Utilities.base64Encode(blob.getBytes())};
}

function getCentralAppData() {
  verdantWebAppAuthorize_();
  const ss = verdantWebAppSpreadsheet_();
  const config = verdantWebAppRows_(ss.getSheetByName('Configurações'), 3);
  const influencerSheet = ss.getSheetByName('Cadastro Influenciadores');
  const influencers = influencerSheet && influencerSheet.getLastRow() > 1
    ? influencerSheet.getRange(2, 1, influencerSheet.getLastRow() - 1, 3).getDisplayValues().map(function (r) { return {name:r[0], profile:r[1], status:r[2]}; })
    : config.filter(function (r) { return String(r[0]) === 'INFLUENCER'; }).map(function (r) { return {name:String(r[1]), profile:'', status:String(r[2])}; });
  const eventsSheet = ss.getSheetByName('Agenda de Eventos');
  const events = eventsSheet ? eventsSheet.getRange(2, 1, 2, 3).getValues().map(function (r) {
    return {day:String(r[0]), date:r[1] instanceof Date ? Utilities.formatDate(r[1], VERDANT_WEBAPP_TZ, 'yyyy-MM-dd') : '', name:String(r[2] || ''), label:String(r[2] || r[0])};
  }) : [];
  const scheduleSheet = ss.getSheetByName('Programação DJs');
  const schedule = scheduleSheet && scheduleSheet.getLastRow() >= 5
    ? scheduleSheet.getRange(5, 1, scheduleSheet.getLastRow() - 4, 6).getDisplayValues().filter(function (r) { return r[0] && r[2]; }).map(function (r) { return {date:r[0], track:r[1], dj:r[2], start:r[3], end:r[4], duration:r[5]}; }) : [];
  const forms = FORMULARIOS.map(function (spec) {
    const id = PropertiesService.getScriptProperties().getProperty('form_' + spec.key);
    if (!id) return null;
    try {
      const form = FormApp.openById(id);
      return {title:form.getTitle(), editUrl:form.getEditUrl(), url:form.getPublishedUrl(), open:form.isAcceptingResponses(), key:spec.key};
    } catch (e) { return {title:spec.title, editUrl:'', url:'', open:false, key:spec.key}; }
  }).filter(Boolean);
  const djs = config.filter(function (r) { return /^DJ_(SEXTA|SABADO)$/i.test(String(r[0])); }).map(function (r) { return {group:String(r[0]), name:String(r[1]), status:String(r[2])}; });
  return {dashboard:getDashboardData(), events:events, djs:djs, influencers:influencers, schedule:schedule, forms:forms};
}

function saveVerdantDj(name, eventDate, track) {
  verdantWebAppAuthorize_();
  name = String(name || '').trim(); track = String(track || '').trim();
  if (!name || ['Pista SKY','Pista LAND'].indexOf(track) < 0) throw new Error('Informe o nome do DJ e selecione a pista.');
  const ss = verdantWebAppSpreadsheet_(); const date = verdantWebAppParseDate_(eventDate);
  const event = verdantWebAppEventForDate_(ss, date);
  if (!event) throw new Error('Escolha uma sexta ou sábado cadastrados na Agenda de Eventos.');
  const roster = ss.getSheetByName('Cadastro DJs');
  roster.appendRow([date, name, track]);
  const group = event.day === 5 ? 'DJ_SEXTA' : 'DJ_SABADO';
  verdantAppUpsertConfig_(ss, group, name, 'Ativo');
  atualizarProgramacaoDJsVerdant_(ss); sincronizarOpcoesFormulariosVerdant(); atualizarResumoVerdant_();
  return getCentralAppData();
}

function saveVerdantInfluencer(name, profile, status) {
  verdantWebAppAuthorize_();
  name = String(name || '').trim(); profile = String(profile || '').trim(); status = status === 'Inativo' ? 'Inativo' : 'Ativo';
  if (!name) throw new Error('Informe o nome completo do influencer.');
  const ss = verdantWebAppSpreadsheet_();
  const sheet = getOrCreateSheet_(ss, 'Cadastro Influenciadores');
  if (sheet.getRange('A1').isBlank()) sheet.getRange('A1:C1').setValues([['Nome','Perfil / @','Status']]);
  const data = sheet.getLastRow() > 1 ? sheet.getRange(2,1,sheet.getLastRow()-1,3).getDisplayValues() : [];
  const existing = data.findIndex(function (r) { return String(r[0]).trim().toLowerCase() === name.toLowerCase(); });
  if (existing >= 0) sheet.getRange(existing + 2, 1, 1, 3).setValues([[name,profile,status]]); else sheet.appendRow([name,profile,status]);
  verdantAppUpsertConfig_(ss, 'INFLUENCER', name, status);
  sincronizarOpcoesFormulariosVerdant(); atualizarResumoVerdant_();
  return getCentralAppData();
}

function saveVerdantEvent(day, eventDate, eventName) {
  verdantWebAppAuthorize_();
  const weekday = day === 'Sexta-feira' ? 5 : day === 'Sábado' ? 6 : 0;
  const date = verdantWebAppParseDate_(eventDate);
  if (!weekday || Number(Utilities.formatDate(date, VERDANT_WEBAPP_TZ, 'u')) !== weekday) throw new Error('A data escolhida precisa corresponder ao dia selecionado.');
  const ss = verdantWebAppSpreadsheet_(); const sheet = ss.getSheetByName('Agenda de Eventos');
  const row = weekday === 5 ? 2 : 3;
  sheet.getRange(row,2).setValue(date); sheet.getRange(row,3).setValue(String(eventName || '').trim());
  atualizarJanelaFormulariosVerdant_();
  return getCentralAppData();
}

function setVerdantOptionStatus(group, name, status) {
  verdantWebAppAuthorize_();
  if (!['DJ_SEXTA','DJ_SABADO','INFLUENCER'].includes(group) || !name) throw new Error('Cadastro ou grupo inválido.');
  const ss=verdantWebAppSpreadsheet_();
  const normalizedStatus=status === 'Inativo'?'Inativo':'Ativo';
  verdantAppUpsertConfig_(ss,group,String(name).trim(),normalizedStatus);
  if (group === 'INFLUENCER') {
    const influencerSheet=getOrCreateSheet_(ss,'Cadastro Influenciadores');
    if (influencerSheet.getLastRow() > 1) {
      const names=influencerSheet.getRange(2,1,influencerSheet.getLastRow()-1,1).getDisplayValues();
      names.forEach(function(r,i){if(String(r[0]).trim().toLowerCase()===String(name).trim().toLowerCase()) influencerSheet.getRange(i+2,3).setValue(normalizedStatus);});
    }
  }
  sincronizarOpcoesFormulariosVerdant(); atualizarJanelaFormulariosVerdant_(); atualizarResumoVerdant_();
  return getCentralAppData();
}

function refreshVerdantForms() {
  verdantWebAppAuthorize_(); sincronizarOpcoesFormulariosVerdant(); atualizarJanelaFormulariosVerdant_();
  return getCentralAppData();
}

function verdantAppUpsertConfig_(ss, group, name, status) {
  const sheet=ss.getSheetByName('Configurações'); if(!sheet) throw new Error('A aba Configurações não existe.');
  const rows=sheet.getLastRow()>1?sheet.getRange(2,1,sheet.getLastRow()-1,3).getDisplayValues():[];
  const index=rows.findIndex(function(r){return String(r[0])===group && String(r[1]).trim().toLowerCase()===name.trim().toLowerCase();});
  if(index>=0) sheet.getRange(index+2,3).setValue(status); else sheet.appendRow([group,name,status]);
}

function verdantWebAppAuthorize_() {
  const email = String(Session.getActiveUser().getEmail() || '').toLowerCase();
  if (!email || email !== VERDANT_WEBAPP_OWNER_EMAIL) {
    throw new Error('Acesso restrito à conta proprietária autorizada. Entre com a conta Google da central Verdant.');
  }
}

function verdantWebAppSpreadsheet_() {
  const id = PropertiesService.getScriptProperties().getProperty('spreadsheet_id');
  if (!id) throw new Error('A planilha central não está configurada. Execute criarFormulariosVerdant() primeiro.');
  return SpreadsheetApp.openById(id);
}

function verdantWebAppRows_(sheet, width) {
  if (!sheet || sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, width).getValues();
}

function verdantWebAppEventDates_(ss) {
  const sheet = ss.getSheetByName('Agenda de Eventos');
  if (!sheet || sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 3).getValues().filter(function (r) {
    return r[1] instanceof Date && /sexta|sábado/i.test(String(r[0] || ''));
  }).map(function (r) {
    return {value: Utilities.formatDate(r[1], VERDANT_WEBAPP_TZ, 'yyyy-MM-dd'), label: String(r[2] || r[0]) + ' • ' + Utilities.formatDate(r[1], VERDANT_WEBAPP_TZ, 'dd/MM/yyyy')};
  });
}

function verdantWebAppEventForDate_(ss, date) {
  const wanted = Utilities.formatDate(date, VERDANT_WEBAPP_TZ, 'yyyy-MM-dd');
  return verdantWebAppEventDates_(ss).map(function (r) {
    return {value: r.value, label: r.label};
  }).filter(function (r) { return r.value === wanted; }).map(function (r) {
    const d = new Date(wanted + 'T12:00:00-03:00');
    return {day: Number(Utilities.formatDate(d, VERDANT_WEBAPP_TZ, 'u')), label: r.label};
  })[0] || null;
}

function verdantWebAppParseDate_(value) {
  const match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) throw new Error('Data inválida.');
  const d = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12, 0, 0);
  if (isNaN(d.getTime())) throw new Error('Data inválida.');
  return d;
}
