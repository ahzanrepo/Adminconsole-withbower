/**
 * Created by Rajinda on 4/27/2016.
 */

angular.module('authServiceModule' ,[])
.service('authService', function () {
    this.Token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3YXJ1bmFAZHVvc29mdHdhcmUuY29tIiwianRpIjoiNjQ3YmVmYmItMzg0My00OTg1LTgyYzItZGJhN2VlN2EyZmIxIiwic3ViIjoiNWRjMWUxYmMtMTRiMS00ZGIxLWE0ODctN2Y3OWJhMmMxY2E5IiwiZXhwIjoxNDY1ODQzMTMzLCJ0ZW5hbnQiOiIxIiwiY29tcGFueSI6IjEiLCJjbGllbnQiOiIxIiwic2NvcGUiOlt7InJlc291cmNlIjoidGFza2luZm8iLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiU2hhcmVkIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InByb2R1Y3Rpdml0eSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0YXNrIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InJlc291cmNldGFza2F0dHJpYnV0ZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJhcmRzcmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZ3JvdXAiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiYXR0cmlidXRlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX1dLCJpYXQiOjE0NjUyMzgzMzN9._g3h5WERdZXDEAJhGC3iLRW3mxkgCHdK_TsOuelDXKU";// response.data;
    this.TokenWithoutBearer = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiMTdmZTE4M2QtM2QyNC00NjQwLTg1NTgtNWFkNGQ5YzVlMzE1Iiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJjbGllbnQiOiIxIiwiZXhwIjoxODkzMzAyNzUzLCJ0ZW5hbnQiOjEsImNvbXBhbnkiOjMsInNjb3BlIjpbeyJyZXNvdXJjZSI6ImFsbCIsImFjdGlvbnMiOiJhbGwifV0sImlhdCI6MTQ2MTI5OTE1M30._M8u4ElZESTdJtkQSEtr58kE97s0KiHeIaeWsoVc8Ho";// response.data;
});
