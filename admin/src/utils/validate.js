export function validUsername(str){
    const valide_name = ['admin','super']
    return valide_name.indexOf(str.trim()) >= 0
}