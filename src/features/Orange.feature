#language: en
@Tests
Feature: Inicio de sesión

  Background:
    Given ingreso a OrangeHRM

  @Test1
  Scenario: Inicio de sesión exitoso con credenciales válidas
    Given el usuario ingresa "Admin" y "admin123" y hace clic en el botón de login
    Then el usuario debería ver el mensaje del Dashboard "Dashboard"

  @Test2
  Scenario: Creación de un nuevo empleado
    Given el usuario ingresa "Admin" y "admin123" y hace clic en el botón de login
    And el usuario debería ver el mensaje del Dashboard "Dashboard"
    When el usuario navega a la sección PIM y hace click en Add Employee
    When el usuario crea un nuevo empleado con los datos:
      | First Name  | Middle Name | Last Name | Employee ID |
      | Juan        | Pedro       | Perez     |             |
    And el usuario debería ver el mensaje de confirmación "Successfully Saved"
    And el usuario debería ver el nombre del empleado "Juan" y "Perez"
    Then el usuario aparece en la lista de empleados
