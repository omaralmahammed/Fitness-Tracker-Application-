using newProjectSUHA.Server.Controllers;

namespace newProjectSUHA.Server.Services
{
    public class EmailReminderService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public EmailReminderService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            // This task will send reminder emails every 24 hours
            var dailyReminderTask = Task.Run(async () =>
            {
                while (!stoppingToken.IsCancellationRequested)
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var paymentController = scope.ServiceProvider.GetRequiredService<PymentController>();
                        await paymentController.SendReminderEmailsAsync();
                    }

                    // Wait for 24 hours before sending reminders again
                    await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
                }
            }, stoppingToken);

            // This task will check for end of subscription every 10 seconds
            var endSubscriptionTask = Task.Run(async () =>
            {
                while (!stoppingToken.IsCancellationRequested)
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var paymentController = scope.ServiceProvider.GetRequiredService<PymentController>();
                        await paymentController.SendEmailsEndSubscription();
                    }

                    // Wait for 10 seconds before checking again
                    await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
                }
            }, stoppingToken);

            // Run both tasks concurrently
            await Task.WhenAll(dailyReminderTask, endSubscriptionTask);
        }




    }
}
