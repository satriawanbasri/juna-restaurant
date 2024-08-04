module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('"Food"', [
            {
                id: '4931803e-d80d-4ab3-9603-ac67097ceb0f',
                createdOn: new Date(),
                createdBy: 'SEEDER',
                updatedOn: new Date(),
                updatedBy: 'SEEDER',
                name: 'Pizza',
                pictureUrl:
                    'https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg',
                price: 40000,
            },
            {
                id: '82ec2e0a-d2e2-452f-986b-1357dbbaf204',
                createdOn: new Date(),
                createdBy: 'SEEDER',
                updatedOn: new Date(),
                updatedBy: 'SEEDER',
                name: 'Burger',
                pictureUrl:
                    'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',
                price: 20000,
            },
            {
                id: '75165f58-e414-4af6-8c37-6e1bff819fa8',
                createdOn: new Date(),
                createdBy: 'SEEDER',
                updatedOn: new Date(),
                updatedBy: 'SEEDER',
                name: 'Sushi',
                pictureUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtAlFyLu8ZAI3cb6oXUMIeCowSsqi2wY2T2nR2XWRk_ybfONrsU_9EqIEzgPBvgNqh9gM&usqp=CAU',
                price: 12000,
            },
            {
                id: '87c17cbc-3387-4689-a8a7-2bb757d360f5',
                createdOn: new Date(),
                createdBy: 'SEEDER',
                updatedOn: new Date(),
                updatedBy: 'SEEDER',
                name: 'Pasta',
                pictureUrl:
                    'https://www.allrecipes.com/thmb/mvO1mRRH1zTz1SvbwBCTz78CRJI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/67700_RichPastaforthePoorKitchen_ddmfs_4x3_2284-220302ec8328442096df370dede357d7.jpg',
                price: 30000,
            },
            {
                id: 'e1983ec1-9692-4b3b-8e4e-0bd69a7e1c4f',
                createdOn: new Date(),
                createdBy: 'SEEDER',
                updatedOn: new Date(),
                updatedBy: 'SEEDER',
                name: 'Salad',
                pictureUrl: 'https://cdn.loveandlemons.com/wp-content/uploads/2021/04/green-salad.jpg',
                price: 15000,
            },
            {
                id: 'c0a57a28-f57b-4711-9ce1-0c52a6f09aa8',
                createdOn: new Date(),
                createdBy: 'SEEDER',
                updatedOn: new Date(),
                updatedBy: 'SEEDER',
                name: 'Ice Cream',
                pictureUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg/640px-Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg',
                price: 10000,
            },
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('"Food"', null, {})
    },
}
