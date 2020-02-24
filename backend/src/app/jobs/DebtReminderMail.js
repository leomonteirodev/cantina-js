import Mail from '../../lib/Mail';

class DebtReminderMail {
  get key() {
    return 'DebtReminderMail';
  }

  async handle({ data }) {
    const { debtors } = data;

    debtors.map(async debtor => {
      const { name, email, balance } = debtor;

      await Mail.sendMail({
        to: email,
        subject: 'Lembrete de Dívida - CantinApp',
        template: 'debt-reminder',
        context: {
          name,
          balance: -balance,
          core: debtor.core.name,
        },
      });
    });
  }
}

export default new DebtReminderMail();
