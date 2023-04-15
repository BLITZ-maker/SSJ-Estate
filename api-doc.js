const apiDoc = {
	swagger: "2.0",
	basePath: "/",
	info: {
		title: "SSJ Estate API",
		version: "1.0.0",
	},
	definitions: {
		Property: {
			type: "object",
			properties: {
				id: {
					type: "number",
				},
				address: {
					type: "string",
				},
				owner: {
					type: "string",
				},
				tenants: {
					type: "array",
					items: {
						$ref: "#/definitions/Tenant",
					},
				},
				rent: {
					type: "number",
				},
				maintenance_expenses: {
					type: "number",
				},
			},
			required: ["id", "address", "owner", "rent"],
		},
		Tenant: {
			type: "object",
			properties: {
				id: {
					type: "number",
				},
				name: {
					type: "string",
				},
				contact_info: {
					type: "string",
				},
			},
			required: ["id", "name"],
		},
	},
	paths: {
		"/portfolio": {
			post: {
				summary: "Add new property to my portfolio.",
				operationId: "addProperty",
				parameters: [
					{
						in: "body",
						name: "property",
						schema: {
							$ref: "#/definitions/Property",
						},
					},
				],
				responses: {
					201: {
						description: "Created",
					},
				},
			},
		},
		"/portfolio/{propertyId}": {
			put: {
				summary: "Edit details of my property.",
				operationId: "editProperty",
				parameters: [
					{
						in: "path",
						name: "propertyId",
						type: "number",
						required: true,
					},
					{
						in: "body",
						name: "property",
						schema: {
							$ref: "#/definitions/Property",
						},
					},
				],
				responses: {
					200: {
						description: "OK",
					},
				},
			},
			delete: {
				summary: "Delete property from my portfolio.",
				operationId: "deleteProperty",
				parameters: [
					{
						in: "path",
						name: "propertyId",
						type: "number",
						required: true,
					},
				],
				responses: {
					200: {
						description: "Deleted",
					},
				},
			},
		},
		"/portfolio/{propertyId}/tenants": {
			post: {
				summary: "Add tenant to my property.",
				operationId: "addTenant",
				parameters: [
					{
						in: "path",
						name: "propertyId",
						type: "number",
						required: true,
					},
					{
						in: "body",
						name: "tenant",
						schema: {
							$ref: "#/definitions/Tenant",
						},
					},
				],
				responses: {
					201: {
						description: "Created",
					},
				},
			},
			get: {
				summary: "Get tenants of my property.",
				operationId: "getTenants",
				parameters: [
					{
						in: "path",
						name: "propertyId",
						type: "number",
						required: true,
					},
				],
				responses: {
					200: {
						description: "OK",
					},
				},
			},
		},
		"/portfolio/{propertyId}/tenants/{tenantId}": {
			put: {
				summary: "Edit details of my tenant.",
				operationId: "editTenant",
				parameters: [
					{
						in: "path",
						name: "propertyId",
						type: "number",
						required: true,
					},
					{
						in: "path",
						name: "tenantId",
						type: "number",
						required: true,
					},
					{
						in: "body",
						name: "tenant",
						schema: {
							$ref: "#/definitions/Tenant",
						},
					},
				],
				responses: {
					200: {
						description: "OK",
					},
				},
			},
			delete: {
				summary: "Delete tenant from my property.",
				operationId: "deleteTenant",
				parameters: [
					{
						in: "path",
						name: "propertyId",
						type: "number",
						required: true,
					},
					{
						in: "path",
						name: "tenantId",
						type: "number",
						required: true,
					},
				],
				responses: {
					200: {
						description: "Deleted",
					},
				},
			},
		},
		"/portfolio/{propertyId}/tenants/{tenantId}/assign": {
			put: {
				summary: "Assign tenant to my property.",
				operationId: "assignTenant",
				parameters: [
					{
						in: "path",
						name: "propertyId",
						type: "number",
						required: true,
					},
					{
						in: "path",
						name: "tenantId",
						type: "number",
						required: true,
					},
				],
				responses: {
					200: {
						description: "OK",
					},
				},
			},
		},
		"/portfolio/{propertyId}/rent/payments": {
			post: {
				summary: "Record rent payment and generate rent invoice.",
				operationId: "recordRentPayment",
				parameters: [
					{
						in: "path",
						name: "propertyId",
						type: "number",
						required: true,
					},
					{
						in: "body",
						name: "payment",
						schema: {
							type: "object",
							properties: {
								tenantId: {
									type: "number",
								},
								amount: {
									type: "number",
								},
								date: {
									type: "string",
									format: "date",
								},
							},
							required: ["tenantId", "amount", "date"],
						},
					},
				],
				responses: {
					201: {
						description: "Created",
					},
				},
			},
		},
		"/portfolio/{propertyId}/rent/collections": {
			get: {
				summary: "Get rent collections and generate rent statements.",
				operationId: "getRentCollections",
				parameters: [
					{
						in: "path",
						name: "propertyId",
						type: "number",
						required: true,
					},
				],
				responses: {
					200: {
						description: "OK",
					},
				},
			},
		},
		"/portfolio/{propertyId}/maintenance/expenses": {
			post: {
				summary: "Add maintenance expense for my property.",
				operationId: "addMaintenanceExpense",
				parameters: [
					{
						in: "path",
						name: "propertyId",
						type: "number",
						required: true,
					},
					{
						in: "body",
						name: "expense",
						schema: {
							type: "object",
							properties: {
								description: {
									type: "string",
								},
								amount: {
									type: "number",
								},
								date: {
									type: "string",
									format: "date",
								},
							},
							required: ["description", "amount", "date"],
						},
					},
				],
				responses: {
					201: {
						description: "Created",
					},
				},
			},
		},
		"/portfolio/{propertyId}/maintenance/expenses/{expenseId}": {
			put: {
				summary: "Edit details of my maintenance expense.",
				operationId: "editMaintenanceExpense",
				parameters: [
					{
						in: "path",
						name: "propertyId",
						type: "number",
						required: true,
					},
					{
						in: "path",
						name: "expenseId",
						type: "number",
						required: true,
					},
					{
						in: "body",
						name: "expense",
						schema: {
							type: "object",
							properties: {
								description: {
									type: "string",
								},
								amount: {
									type: "number",
								},
								date: {
									type: "string",
									format: "date",
								},
							},
						},
					},
				],
				responses: {
					200: {
						description: "OK",
					},
				},
			},
			delete: {
				summary: "Delete maintenance expense from my property.",
				operationId: "deleteMaintenanceExpense",
				parameters: [
					{
						in: "path",
						name: "propertyId",
						type: "number",
						required: true,
					},
					{
						in: "path",
						name: "expenseId",
						type: "number",
						required: true,
					},
				],
				responses: {
					200: {
						description: "Deleted",
					},
				},
			},
		},
	},
	definitions: {
		Property: {
			type: "object",
			properties: {
				propertyId: {
					type: "number",
				},
				address: {
					type: "string",
				},
				rent: {
					type: "number",
				},
				tenants: {
					type: "array",
					items: {
						type: "object",
						properties: {
							tenantId: {
								type: "number",
							},
							name: {
								type: "string",
							},
							contactNumber: {
								type: "string",
							},
					
							email: {
								type: "string",
								format: "email",
							},
						},
						required: ["tenantId", "name", "contactNumber", "email"],
					},
				},
			},
		},
		RentPayment: {
			type: "object",
			properties: {
				rentId: {
					type: "number",
				},
				propertyId: {
					type: "number",
				},
				tenantId: {
					type: "number",
				},
				amount: {
					type: "number",
				},
				date: {
					type: "string",
					format: "date",
				},
			},
			required: ["rentId", "propertyId", "tenantId", "amount", "date"],
		},
		MaintenanceExpense: {
			type: "object",
			properties: {
				expenseId: {
					type: "number",
				},
				propertyId: {
					type: "number",
				},
				description: {
					type: "string",
				},
				amount: {
					type: "number",
				},
				date: {
					type: "string",
					format: "date",
				},
			},
			required: ["expenseId", "propertyId", "description", "amount", "date"],
		},
	},
};
			